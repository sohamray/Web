function changeBox(){
	document.getElementById("box").style.backgroundColor = document.getElementById("color").value +"";
}
var timer = null;
var opac = 0.0;
function dispsub(){
	clearInterval(timer);
	if(document.getElementById("color").value.length==0){timer = setInterval(changeopneg, 10);}
	else{timer = setInterval(changeop, 10);}
}
function changeop(){
	if(opac>1.0){
		clearInterval(timer);
		return;
	}
	opac+=0.01;
	document.getElementById("submit").style.opacity = opac;
}
function changeopneg(){
	if(opac<0.0){
		clearInterval(timer);
		return;
	}
	opac-=0.01;
	document.getElementById("submit").style.opacity = opac;
}