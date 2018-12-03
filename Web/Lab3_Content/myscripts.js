var queryoutput;
var timer = null;
function whenClicked(){
	document.getElementById("r1").innerHTML = '';
	document.getElementById("r2").innerHTML = '';
	document.getElementById("r3").innerHTML = '';
	document.getElementById("r4").innerHTML = '';
	document.getElementById("suggestions").style.visibility="hidden";
	var xhttp = new XMLHttpRequest();
	var request= document.getElementById("queryInput").value;
	if(request===''){return;}
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			queryoutput = this.responseText.split(' ');
			if(queryoutput.length>1){
				document.getElementById("suggestions").style.visibility="visible";
				document.getElementById("r1").innerHTML = queryoutput[1];
			}
			if(queryoutput.length>2)
				document.getElementById("r2").innerHTML = queryoutput[2];
			if(queryoutput.length>3)
				document.getElementById("r3").innerHTML = queryoutput[3];
			if(queryoutput.length>4)
				document.getElementById("r4").innerHTML = queryoutput[4];
		}
	};
	xhttp.open("GET", "http://tmrudwick-web.herokuapp.com/SearchQuery/search.php?query="+request, true);
	xhttp.send();
}
function checkTime(){
    clearTimeout(timer); 
    timer = setTimeout(whenClicked, 500)
}
function getResults(n){
	if(queryoutput.length<n+1){return;}
	var site="http://www.google.com/#q=" + queryoutput[n];
	window.open(site);
}
function search(){
	var site="http://www.google.com/#q=" + document.getElementById("queryInput").value;
	window.open(site);
}