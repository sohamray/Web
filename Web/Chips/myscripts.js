Element.prototype.remove = function() {this.parentElement.removeChild(this);}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

//Public Variables
var squishiendo = false;
var curplayer = null;
var currentBid = 0;
var pwidth = null;
var timer = null;
var players = [];
var opac = 0.0;
var totinr = 0;
var round = 1;
var count = 0;
var pot = 0;

var inputpanehtml =`
<div class='inputallcontainer'>
  <h1 class="typo-styles__demo mdl-typography--display-3" id='penetrateme' style="margin:0px; padding: 0px;"></h1>
  <div class='inputall'>
    <div id="currentBid"></div>
    <div id="pot"></div>
    <input class='input' type='number' id='numraise' onkeyup='dispnsub()'></input><br>
    <button class='button fold' onclick="nextplayer('fold')">Fold</button><br>
    <button class='button check' onclick="nextplayer('check')">Check</button><br>
    <button class='button call' onclick="nextplayer('call')">Call</button><br>
    <button id='submit' class='button raise' onclick="nextplayer('raise')">Raise</button><br>
  </div>
</div>`;

//Builder Methods
function creategame(){
  clearInterval(timer);
  opac = 0.0;
  document.getElementById('savegame').style.opacity = 1.0;
	var colors = ["rgb(12,38,60)","rgb(77,163,185)","rgb(133,39,61)","rgb(219,39,61)","rgb(232,125,114)","rgb(81,20,61)"];
	pwidth = (40/(countplayers()-1));
	players.push([document.getElementById("player1").value.toUpperCase(),1500,colors[0],0]);
	createplayer(document.getElementById("player1").value.toUpperCase(),colors[0],60,players.length-1);
	curplayer = players[0][0];
	for(var i=2;i<7;i++){
		if(document.getElementById("player" + i).value.length>0){
			players.push([document.getElementById("player" + i).value.toUpperCase(),1500,colors[i-1],0]);
		  createplayer(document.getElementById("player" + i).value.toUpperCase(),colors[i-1],pwidth,players.length-1);
		}
	}
	document.getElementsByClassName("inputpane").remove();
	document.getElementById("gamepane").style.opacity = 1.0;
  totinr = players.length;
}
function createplayer(name,color,pwidth,num){
	var temp = document.createElement("div");
	temp.style.width = pwidth+"%";
	temp.style.background = color;
	temp.style.color = "white";
	temp.setAttribute('class','playerpane');
	temp.setAttribute('id',name);
  temp.setAttribute('data-pos',num);
  if(pwidth==60){
    temp.innerHTML = "<div class=playerspacer id='"+name+"space'>"+inputpanehtml;
    document.getElementById("gamepane").appendChild(temp);
    document.getElementById('penetrateme').innerHTML = name;
    document.getElementById('numraise').placeholder = '$'+players[document.getElementById(name).getAttribute('data-pos')][1];
    document.getElementById('currentBid').innerHTML = '$'+currentBid.toFixed(2);
    document.getElementById('pot').innerHTML = '$'+pot.toFixed(2);;
  }
  else{
    temp.innerHTML = "<div class=playerspacer id='"+name+"space'><div class='headname'>"+name+"</div></div>";
    document.getElementById("gamepane").appendChild(temp);
  }
}

//Game Logic Methods
function nextplayer(action){
  if(players[document.getElementById(curplayer).getAttribute('data-pos')][3]>10000){
    document.getElementById('numraise').value = "";
    return;
  }
  if(action=='raise'){
    var val = document.getElementById('numraise').value-players[document.getElementById(curplayer).getAttribute('data-pos')][3];
    if(val>players[document.getElementById(curplayer).getAttribute('data-pos')][1] || val<currentBid){
      return;
    }
    players[document.getElementById(curplayer).getAttribute('data-pos')][3] +=val;
    players[document.getElementById(curplayer).getAttribute('data-pos')][1] -=val;
    currentBid = val;
    count = 1;
  }
  if(action=='call'){
    var val = currentBid-players[document.getElementById(curplayer).getAttribute('data-pos')][3];
    if(val>players[document.getElementById(curplayer).getAttribute('data-pos')][1]){
      return;
    }
    players[document.getElementById(curplayer).getAttribute('data-pos')][3] +=val;
    players[document.getElementById(curplayer).getAttribute('data-pos')][1] -=val;
    currentBid = val;
    count +=1;
  }
  if(action=='fold'){
    pot+= players[document.getElementById(curplayer).getAttribute('data-pos')][3];
    players[document.getElementById(curplayer).getAttribute('data-pos')][3] =99999;
    totinr-=1;
  }
  if(action=='check'){
    count +=1;
  }
  document.getElementById('numraise').placeholder = '$'+players[document.getElementById(curplayer).getAttribute('data-pos')][1];
  document.getElementById('numraise').value = "";
  document.getElementById('currentBid').innerHTML = '$'+currentBid.toFixed(2);
  document.getElementById('pot').innerHTML = '$'+pot.toFixed(2);;
  if(count>=totinr){nextBet();}
  var pos = (parseFloat(document.getElementById(curplayer).getAttribute('data-pos'))+1)%players.length;
  unsquish(players[pos][0]);
}
function nextMatch(){
  var askfill = '';
  for(var i=0; i<players.length; i++){
    if(players[i][3]<9001){
      askfill+=`
      <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="checkbox-`+i+`">
        <input type="switch" id="checkbox-`+i+`" class="mdl-switch__input">
        <span class="mdl-switch__label">`+players[i][0]+`</span>
      </label>
      `;
    }
  }
  document.getElementById('winner').innerHTML = askfill;
  var person = prompt("Who Won?", "Name");
  if (person != null) {
      players[document.getElementById(person.toUpperCase()).getAttribute('data-pos')][1]+=parseFloat(pot);
      pot=0;
      unsquish(person.toUpperCase());
      if(curplayer!=person.toUpperCase())
        setTimeout(function(){unsquish(players[0][0])},3000);
  }
  players.forEach(function(i){
    if(i[1]<1)
      i[3]=999999;
    else
      i[3]=0;
  });
  roundcount();
}
function nextBet(){
  currentBid = 0;
  count=0;
  players.forEach(function(i){
    if(i[3]<10000){
      pot+=parseFloat(i[3]);
      i[3] = 0;
    }
  });
  document.getElementById('currentBid').innerHTML = '$'+currentBid.toFixed(2);
  document.getElementById('pot').innerHTML = '$'+pot.toFixed(2);;
  if(round==3){
    nextMatch();
    round = 1;
    unsquish(players[0][0]);
    return;
  }
  round++;
  alert("Flip Next Card");
  unsquish(players[0][0]);
}

//Count Methods
function countplayers(){
	var count = 6;
	if(document.getElementById("player1").value.length==0){count--;}
	if(document.getElementById("player2").value.length==0){count--;}
	if(document.getElementById("player3").value.length==0){count--;}
	if(document.getElementById("player4").value.length==0){count--;}
	if(document.getElementById("player5").value.length==0){count--;}
	if(document.getElementById("player6").value.length==0){count--;}
	return count;
}
function roundcount(){
  totinr = 0;
  players.forEach(function(i){
    if(i[1]<9001){
      totinr++;
    }
  });
}

//Style Methods
function dispsub(){
	clearInterval(timer);
	if(countplayers()<2){timer = setInterval(changeopneg, 10);}
	else{timer = setInterval(changeop, 10);}
}
function dispnsub(){
  clearInterval(timer);
	if(document.getElementById('numraise').value.length==0&&parseFloat(document.getElementById('numraise').value)>currentBid){timer = setInterval(changeopneg, 10);}
	else{
    timer = setInterval(changeop, 10);
  }
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
function squish(elid){
	if(parseFloat(document.getElementById(elid).style.width)>pwidth){
		var squishtimer = setInterval(function(){squishing(elid,squishtimer)},10);
	}
}
function squishing(elid,tim){
  if(parseFloat(document.getElementById(elid).style.width)<40){document.getElementById(elid+"space").innerHTML = "<div class='headname'>"+elid+"</div>";}
  if(parseFloat(document.getElementById(elid).style.width)>pwidth){
		document.getElementById(elid).style.width = parseFloat(document.getElementById(elid).style.width)-1+"%";
	}
	else{
		clearInterval(tim);
	}
}
function unsquish(elid){
  if(players[document.getElementById(elid).getAttribute('data-pos')][3]>9001){
    unsquish(players[((parseFloat(document.getElementById(elid).getAttribute('data-pos'))+1)%players.length)][0]);
    return;
  }
	if(squishiendo){return;}
	if(curplayer==elid){return;}
	squishiendo = true;

  if(parseFloat(document.getElementById(elid).style.width)<60){
    opac = 0;
		squish(curplayer);
		curplayer = elid;
		var unsquishtimer = setInterval(function(){unsquishing(elid,unsquishtimer)},10);
	}
}
function unsquishing(elid,tim){
  if(parseFloat(document.getElementById(elid).style.width)>40){
    document.getElementById(elid+'space').innerHTML = inputpanehtml;
    document.getElementById('numraise').placeholder = '$'+players[document.getElementById(elid).getAttribute('data-pos')][1];
    document.getElementById('penetrateme').innerHTML = elid;
    document.getElementById('currentBid').innerHTML = '$'+currentBid.toFixed(2);
    document.getElementById('pot').innerHTML = '$'+pot.toFixed(2);;
  }
  if(parseFloat(document.getElementById(elid).style.width)<60){
		document.getElementById(elid).style.width = parseFloat(document.getElementById(elid).style.width)+1+"%";
	}
	else{
		clearInterval(tim);
		squishiendo = false;
	}
}

//SQL STUFF
function savegame(){
  var xhttp = new XMLHttpRequest();
  var requests = "&three=";
  if(players.length>2)
    requests+=players[2][0]+"&threecash="+players[2][1];
  else
    requests+="FFFFFF&threecash=999999";
  requests+="&four=";
  if(players.length>3)
    requests+=players[3][0]+"&fourcash="+players[3][1];
  else
    requests+="FFFFFF&fourcash=999999";
  requests+="&five=";
  if(players.length>4)
    requests+=players[4][0]+"&fivecash="+players[4][1];
  else
    requests+="FFFFFF&fivecash=999999";
  requests+="&six=";
  if(players.length>5)
    requests+=players[5][0]+"&sixcash="+players[5][1];
  else
    requests+="FFFFFF&sixcash=999999";

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			queryoutput = this.responseText;
			alert("Write Down Your Game Code: "+queryoutput.substring(2,queryoutput.length-1));
		}
	};
	xhttp.open("GET", "https://course-index.herokuapp.com/Chips/PHPSQL.php?one="+players[0][0]+"&onecash="+players[0][1]+"&two="+players[1][0]+"&twocash="+players[1][1]+requests, true);
	xhttp.send();
}
function getData(){
  var xhttp = new XMLHttpRequest();
  var code = prompt("What was your code?", "XXXXXXXXXXX");
  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			queryoutput = this.responseText;
      loadgame(queryoutput.substring(1));
		}
	};
	xhttp.open("GET", "https://course-index.herokuapp.com/Chips/PHPSQL.php?tn="+code, true);
	xhttp.send();
}
function loadgame(input){
  clearInterval(timer);
  opac = 0.0;
  var tarray = input.split(' ');
  for(var i=0;i<tarray.length;i++){
    tarray[i] =tarray[i].substring(3);
    if(tarray[i].localeCompare('FFFFFF')==0){
      console.log('bruh');
      tarray.splice(i,tarray.length-i);
    }
  }
  console.log(tarray.toString());
  console.log(tarray[0]);
  document.getElementById('savegame').style.opacity = 1.0;
	var colors = ["rgb(12,38,60)","rgb(77,163,185)","rgb(133,39,61)","rgb(219,39,61)","rgb(232,125,114)","rgb(81,20,61)"];

	players.push([tarray[0].toUpperCase(),parseFloat(tarray[1]),colors[0],0]);
	createplayer(tarray[0].toUpperCase(),colors[0],60,players.length-1);
	curplayer = players[0][0];
  pwidth = (40/(tarray.length/2-1));
  for(var i=1;i<tarray.length/2;i++){
    console.log(tarray[i*2]);
    if(parseFloat(tarray[i*2+1])<9001){
		  players.push([tarray[i*2].toUpperCase(),parseFloat(tarray[i*2+1]),colors[i],0]);
		  createplayer(tarray[i*2].toUpperCase(),colors[i],pwidth,players.length-1);
    }
	}
	document.getElementsByClassName("inputpane").remove();
	document.getElementById("gamepane").style.opacity = 1.0;
  totinr = players.length;
}
