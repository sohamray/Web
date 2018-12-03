var dots = [];
var curtool = 'select';
var mycanvas = null;
var tx = null;
var ty = null;
var ctrl = false;
var squished = true;
window.onload=function () {
  mycanvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      rect = {},
      drag = false;
  mycanvas.addEventListener('mousedown', mouseDown, false);
  mycanvas.addEventListener('mouseup', mouseUp, false);
  mycanvas.addEventListener('mousemove', mouseMove, false);
  window.addEventListener( 'keydown', ctrdown, false);
  window.addEventListener( 'keyup', ctrup, false);
}
function ctrdown(e){
  if(e.keyCode==67)
    ctrl=true;
  else {
    moveSomething(e);
  }
}
function ctrup(e){
  ctrl=false;
}
function moveSomething(e){
  curtool = 'moving';
  var x = 0;
  var y = 0;
  switch (e.keyCode) {
    case 37:
      x= -1;
      break;
    case 38:
      y= -1;
      break;
    case 39:
      x= 1;
      break;
    case 40:
      y= 1;
      break;
  }
  if(e.keyCode==8){
    dots.forEach(function(i){
      if(i[4]){
        i[3] = 0;
      }
    });
  }
  else{
    dots.forEach(function(i){
      if(i[4]){
        i[0] += x;
        i[1] += y;
      }
    });
  }
  draw(e);
  curtool = 'rectan';
}
function changetool(newtool){
  clearSelect();
  document.getElementById(curtool).style.backgroundColor = 'rgba(255,255,255,0.0)';
  curtool = newtool;
  document.getElementById(curtool).style.backgroundColor = 'white';
  if(curtool=='circle'||curtool=='spray'){
    if(squished){
      unsquish('settings');
      squished=false;
    }
  }
  else{
    squish('settings');
    squished=true;
  }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function mouseDown(e) {

  if(curtool=='circle'){
    dots.push([e.pageX - this.offsetLeft,e.pageY - this.offsetTop,document.getElementById('fillcolor').value,document.getElementById('sliding').value,false]);
    draw(e);
  }
  else if(curtool!='spray'){
    squish('settings');
  }
  if(curtool=='select'){
    if(!ctrl){
      clearSelect();
      draw(e);
    }
    tx = (e.pageX - this.offsetLeft);
    ty = (e.pageY - this.offsetTop);
    dots.forEach(function(x){
      if((tx-x[0])*(tx-x[0])+(ty-x[1])*(ty-x[1])<x[3]*x[3]){
        x[4] = true;
      }
    });
    draw(e);
    drag = true;
  }
  if(curtool=='spray'){
    drag = true;
    mouseMove(e);
  }
  if(curtool=='eraser'){
    tx = (e.pageX - this.offsetLeft);
    ty = (e.pageY - this.offsetTop);
    dots.forEach(function(x){
      if((tx-x[0])*(tx-x[0])+(ty-x[1])*(ty-x[1])<x[3]*x[3]){
        x[3] = 0;
      }
    });
    draw(e);
  }
  if(curtool=='rectan'){
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
  }
}
function clearSelect(){
  dots.forEach(function(x){
    x[4] = false;
  });
}
function mouseUp() {
  drag = false;
  if(curtool=='eraser'){

  }
  if(curtool=='rectan'){
    drag = false;
    select(rect.startX, rect.startY, rect.startX+rect.w, rect.startY+rect.h);
    curtool = 'select';
    draw();
    curtool = 'rectan';
  }
  if(curtool=='spray'){
    drag = false;
  }
}
function mouseMove(e) {
  // if(curtool=='pencil'||curtool=='eraser'){
  //   if (drag) {
  //     rect.w = (e.pageX - this.offsetLeft);
  //     rect.h = (e.pageY - this.offsetTop);
  //     draw(e);
  //   }
  // }
  if(curtool=='spray'){
    if(drag){
      for(var i=0; i<100; i++){
        var x = Math.random()*document.getElementById('sliding').value*2-document.getElementById('sliding').value;
        var y = Math.random()*document.getElementById('sliding').value*2-document.getElementById('sliding').value;
        if(x*x+y*y>document.getElementById('sliding').value*document.getElementById('sliding').value){i--;}
        else
          dots.push([e.pageX - this.offsetLeft+x,e.pageY - this.offsetTop+y,document.getElementById('fillcolor').value,1,false]);
      }
      draw(e);
    }
  }
  if(curtool=='select'){
    if (drag) {
      ex = (e.pageX - this.offsetLeft);
      ey = (e.pageY - this.offsetTop);
      var tempx = ex-tx;
      var tempy = ey-ty;
      tx = ex;
      ty = ey;
      dots.forEach(function(i){
        if(i[4]){
          i[0] += tempx;
          i[1] += tempy;
        }
      });
      draw(e);
    }
  }
  if(curtool=='rectan'){
    if (drag) {
      rect.w = (e.pageX - this.offsetLeft) - rect.startX;
      rect.h = (e.pageY - this.offsetTop) - rect.startY ;
      ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
      draw(e);
    }
  }
}
function select(xi,yi,xf,yf){
  dots.forEach(function(x){
    x[4] = (x[0]>xi&&x[0]<xf&&x[1]>yi&&x[1]<yf)||(x[0]>xi&&x[0]<xf&&x[1]<yi&&x[1]>yf)||(x[0]<xi&&x[0]>xf&&x[1]>yi&&x[1]<yf)||(x[0]<xi&&x[0]>xf&&x[1]<yi&&x[1]>yf);
  });
}
function clear() {
  ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
}
function draw(e) {

  clear();
  dots.forEach(function(x){
    ctx.fillStyle = x[2]+"";
    ctx.globalAlpha=.9;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.setLineDash([5]);
    ctx.arc(x[0], x[1], x[3], 0, 2*Math.PI);
    ctx.fill();
    if(x[4])
      ctx.stroke();
  });
  if(curtool=='rectan'){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.globalAlpha=0.5;
    ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  }
  if(curtool=='pencil'){
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(posx, posy, 10, 0, 2*Math.PI);
    ctx.fill();
  }
}
var squishiendo = false;
function squish(elid){
  //document.getElementById(elid).style.width = "240px";
	if(parseFloat(document.getElementById(elid).style.left)>0){
		var squishtimer = setInterval(function(){squishing(elid,squishtimer)},10);
	}
}
function squishing(elid,tim){
  if(parseFloat(document.getElementById(elid).style.left)>0){
		document.getElementById(elid).style.left = parseFloat(document.getElementById(elid).style.left)-5+"px";
	}
	else{
		clearInterval(tim);
	}
}
function unsquish(elid){
  document.getElementById(elid).style.left = "0px";

	if(squishiendo){return;}
	squishiendo = true;
	if(parseFloat(document.getElementById(elid).style.left)<120){
		var unsquishtimer = setInterval(function(){unsquishing(elid,unsquishtimer)},10);
	}
}
function unsquishing(elid,tim){
  if(parseFloat(document.getElementById(elid).style.left)<120){
		document.getElementById(elid).style.left = parseFloat(document.getElementById(elid).style.left)+5+"px";
	}
	else{
		clearInterval(tim);
		squishiendo = false;
	}
}
