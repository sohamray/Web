var timer = null;
var opac = 0.0;
var usern = null;
var pwd = null;
function dispsub(){
	clearInterval(timer);
	if(document.getElementById("pass").value.length==0){timer = setInterval(changeopneg, 10);}
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
function submit(){
	usern = document.getElementById("user").value;
	pwd = document.getElementById("pass").value;
	var elem = document.getElementById('login');
    elem.parentNode.removeChild(elem);
	document.getElementById("grades").style.visibility = "visible";
	document.getElementById("header").style.visibility = "visible";
	
}