var current_player = 'p1l';
var next_player = 'p2l';
var queryoutput = null;
var gh = 'ghost';
var loss1 = 0;
var loss2 = 0;
window.onload = function fadeStuffIn(){
	document.getElementById('word').style.opacity = 0.0;
	var newTimer = setInterval(function(){fade('word',newTimer,1.0);}, 20);
}
function sendQuery(wrd,type,challnum) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			queryoutput = this.responseText;
			//It's a Submission
			if(type==="submit") {
        if(wrd.length>3&&queryoutput.indexOf('0')==-1){
					document.getElementById("entered").style.color="red";
					setTimeout(function() {
						dispLetter(next_player.charAt(1));
						document.getElementById("entered").style.color="rgb(180,180,180)";
					},1000);
				}
      }
			//It's a Challenge SOMETHINGS WRONG
      else {
        if(queryoutput.indexOf('0')>=0)
            dispLetter(((3.0-parseFloat(challnum))+"").substring(0,1)); //Opposite of challnum
        else
            dispLetter(challnum); //challnum
      }
		}
	};
	xhttp.open("GET", "http://course-index.herokuapp.com/Lab4_Content/index.php?name=" + wrd+'&type='+type, true);
	xhttp.send();
}
function submit (id) {
	if(id!=current_player){return;}
	var bigWord = document.getElementById('entered');
	var user = document.getElementById(id);
	bigWord.innerHTML+=user.value.toLowerCase();
	var word = bigWord.innerHTML;
	if(word.length>1)
		sendQuery(word,"submit","0");
	changeTurn();
}
function dispLetter (pn) {
	document.getElementById('entered').innerHTML="";
	if(pn==1) {
		var temp = loss1;
		loss1++;
	}

	else {
		var temp = loss2;
		loss2++;
	}
	fadeTile((gh.charAt(temp)+pn));
	if(loss1==5||loss2==5){
		document.getElementById('word').innerHTML = document.getElementById('player'+pn).value+' Loses!';
		document.getElementById('gameArea').innerHTML = '';
	}
}
function challenge (num) {
	if(document.getElementById('entered').innerHTML<2||num!=current_player.charAt(1)+""){return;}
	sendQuery(document.getElementById('entered').innerHTML,"challenge",num);
	changeTurn();
}
function changeTurn() {
	var cursub = document.getElementById('submit'+current_player.charAt(1));
	console.log('submit'+current_player.charAt(1));
	var cursubtim = setInterval(function(){fade('submit'+current_player.charAt(1),cursubtim,-1.0);}, 5);
	document.getElementById(current_player).value='';
	setTimeout(function(){
		document.getElementById(current_player).disabled=true;
		document.getElementById(next_player).disabled=false;
		document.getElementById(next_player).focus();
		var temp = current_player;
		current_player = next_player;
		next_player = temp;
	}, 1000);
}
function fadeTile(id) {
	var ti = document.getElementById(id);
	ti.style.opacity=0.0;
	var tiletimer = setInterval(function(){fade(id,tiletimer,1.0);}, 5);
}
function fade(id,objtim,dir) {
	console.log(id);
	var curopac =  parseFloat(document.getElementById(id).style.opacity)+.01*dir;
	if(document.getElementById(id).style.opacity==(.5+.5*dir))
		clearInterval(objtim);
	else
		document.getElementById(id).style.opacity=curopac;
}
function dispsub (id, parent) {
	var sub=document.getElementById(id);
	if(document.getElementById(parent).value.length==0.0){
		sub.style.opacity = 1.0;
		var fotime = setInterval(function(){fade(id,fotime,-1.0);}, 10);
	}
	else{
		sub.style.opacity = 0.0;
		var fitime = setInterval(function(){fade(id,fitime,1.0);}, 10);
	}
}
