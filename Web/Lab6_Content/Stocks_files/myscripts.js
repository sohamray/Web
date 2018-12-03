var queryoutput;
var timer = null;
var opac = 0.0;
var portfolio = [];
var names = [];
var totCash = 0.00;
function whenClicked(name,price,quantity){
	var xhttp = new XMLHttpRequest();
	var request= document.getElementById("stockname").value;
	if(request===''){return;}
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			queryoutput = this.responseText;
			queryoutput = queryoutput.substring(queryoutput.indexOf('"l" : "')+7, queryoutput.indexOf(',"l_')-2);
			console.log(queryoutput);
			process(name,parseFloat(queryoutput),quantity);
		}
	};
	xhttp.open("GET", "http://finance.google.com/finance/info?client=ig&q=NASDAQ:"+request, true);
	xhttp.send();
}
function dispsub(){
	clearInterval(timer);
	if(document.getElementById("stockname").value.length==0||document.getElementById("quantity").value.length==0){timer = setInterval(changeopneg, 10);}
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
function process(name,price,quantity){
	var value = price*quantity;
	var tab = document.getElementById('maintable');
	if(names.indexOf(name)==-1){
		if(quantity==0){return;}
		names.push(name);
		portfolio.push([name,value]);
		var row = tab.insertRow(tab.rows.length);
    var cellname = row.insertCell(0);
    var cellprice = row.insertCell(1);
		var cellquantity = row.insertCell(2);
		cellname.className = 'sname';
		cellprice.className = 'sprice';
		cellquantity.className = 'squan';
		cellname.innerHTML = name;
		cellprice.innerHTML = "$"+price;
		cellquantity.innerHTML = quantity;
		console.log(portfolio);
		console.log(portfolio[0]);
		totCash+=price*quantity;
	}
	else{
		var temp = names.indexOf(name);
		totCash-=portfolio[temp][1];
		portfolio.splice(temp,1);
		names.splice(temp,1);
		tab.deleteRow(temp+1);
		if(quantity>0){
			process(name,price,quantity);
		}
	}
	document.getElementById('tot').innerHTML="$"+Math.round(totCash*100)/100;
}
