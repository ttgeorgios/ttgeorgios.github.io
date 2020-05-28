var slider = document.getElementById("probSlider");
var outputSane = document.getElementById("saneprob");
var outputCrazy = document.getElementById("crazyprob");
var m1 = document.getElementById("m1");
var d1 = document.getElementById("d1");
var p1 = document.getElementById("p1");
var x = document.getElementById("x");
var d2 = document.getElementById("d2");
var p2 = document.getElementById("p2");
var sane = document.getElementById("sane");
var crazy = document.getElementById("crazy");
var sanityProb = document.getElementById("probSlider");
var submit = document.getElementById("submit");
var buttonDiv = document.getElementById("buttondiv");
var tableButton = document.getElementById("showTable");
var message = document.getElementById("message");
var pawn = document.getElementById("pawn");
var navCounter = 0;

function shiftNav() {
  if(navCounter % 2 == 0){
    document.getElementById("mySidebar").style.width = "500px";
    document.getElementById("main").style.marginLeft = "500px";
  } else {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  navCounter ++;
}

slider.oninput = function() {
  outputCrazy.textContent = 100 - this.value;
  outputSane.textContent = this.value;
}

document.getElementById("gameform").onreset = function() {
  outputCrazy.textContent = 50;
  outputSane.textContent = 50;
};

function disable(mode){
  submit.disabled = mode;
  m1.disabled = mode;
  d1.disabled = mode;
  p1.disabled = mode;
  x.disabled = mode;
  d2.disabled = mode;
  p2.disabled = mode;
  sane.disabled = mode;
  crazy.disabled = mode;
  sanityProb.disabled = mode;
}

function resetTable() {
  table = document.getElementsByClassName("gametable")[0];
  i = 1; j = 1;
  for(i = 1; i <= 3; i++){
    for(j = 1; j <= 2; j++){
      table.rows[i].cells[j].style.backgroundColor = "lightslategrey";
    }
  }
}

function displayTables(table1, table2) {
  document.getElementsByClassName("gametable")[0].style.display = table2;
  document.getElementById("originalTable").style.display = table1;
}

tableButton.onclick = function(){
  if(document.getElementById("originalTable").style.display == "none"){
    displayTables("table", "none");
    tableButton.textContent = "Show Numeric Payoffs";
  }else{
    displayTables("none", "");
    tableButton.textContent = "Show Payoff Formulas";
  }
}

submit.onclick = function(){

  disable("true");
  resetTable();
  message.src = "placeholder.png";
  pawn.src = "pawn.png";
  displayTables("none", "");

  //resetting red errors (not the optimal way but it works :D)
  setTimeout(function(){
    inputList = document.getElementsByTagName('input');
    i = 0;
    for (i = 0; i < inputList.length - 1; i++) {
      inputList[i].style.backgroundColor = "white";
    }
  }, 1000)

  if (!m1.checkValidity() || m1.value === "") {
    m1.style.backgroundColor = "red";
    disable('');
    return;
  }
  if (!d1.checkValidity() || d1.value === "") {
    d1.style.backgroundColor = "red";
    disable('');
    return;
  }
  if (!p1.checkValidity() || p1.value === "") {
    p1.style.backgroundColor = "red";
    disable('');
    return;
  }
  if (!x.checkValidity() || x.value === "") {
    x.style.backgroundColor = "red";
    disable('');
    return;
  }
  if (!d2.checkValidity() || d2.value === "") {
    d2.style.backgroundColor = "red";
    disable('');
    return;
  }
  if (!p2.checkValidity() || p2.value === "") {
    p2.style.backgroundColor = "red";
    disable('');
    return;
  }
  if((Number(m1.value) <= Number(d1.value)) || (Number(d1.value) <= Number(p1.value))) {
    m1.style.backgroundColor = "red";
    d1.style.backgroundColor = "red";
    p1.style.backgroundColor = "red";
    disable('');
    return;
  }

  tableButton.style.display = "";
  tableButton.textContent = "Show Payoff Formulas";

  //update table
  document.getElementById("sanePreyStay").textContent = (2*Number(p1.value)).toString() + ", " + d2.value;
  document.getElementById("sanePreyExit").textContent = (Number(p1.value) + Number(m1.value)).toString() + ", 0";
  document.getElementById("saneAccStay").textContent = (2*Number(d1.value)).toString() + ", " + d2.value;
  document.getElementById("saneAccExit").textContent = (Number(d1.value) + Number(m1.value)).toString() + ", 0";
  document.getElementById("crazyStay").textContent = x.value + ", " + p2.value;
  document.getElementById("crazyExit").textContent = x.value + ", 0";

  submit.value = "The Incumbent Firm Sends Message...";
  setTimeout(function(){
    if (crazy.checked === true){
      // crazy,prey
      document.getElementsByClassName("gametable")[0].rows[3].cells[1].style.backgroundColor = "indigo";
      document.getElementsByClassName("gametable")[0].rows[3].cells[2].style.backgroundColor = "indigo";
      message.src = "prey.png";
      submit.value= "The Entrant Firm Acts...";
    } 
    if (Number(d1.value) + Number(d1.value) >= Number(p1.value) + Number(m1.value)){
      //sane, accomodate
      if (crazy.checked === true){
        setTimeout(function(){
          document.getElementsByClassName("gametable")[0].rows[1].cells[2].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[2].cells[2].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[3].cells[2].style.backgroundColor = "#f4511e";
          pawn.src = "exit.png";
          submit.value = "Start"
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      } else {
        document.getElementsByClassName("gametable")[0].rows[2].cells[1].style.backgroundColor = "indigo";
        document.getElementsByClassName("gametable")[0].rows[2].cells[2].style.backgroundColor = "indigo";
        message.src = "acc.png";
        submit.value= "The Entrant Firm Acts...";
        setTimeout(function(){
          document.getElementsByClassName("gametable")[0].rows[1].cells[1].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[2].cells[1].style.backgroundColor = "#f4511e";
          document.getElementsByClassName("gametable")[0].rows[3].cells[1].style.backgroundColor = "#4CAF50";
          pawn.src = "stay.png";
          submit.value = "Start"
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      }
    } else if (Number(d1.value) + Number(d1.value) < Number(p1.value) + Number(m1.value) && ((sanityProb.value/100)*Number(d2.value) + ((100 - sanityProb.value)/100)*Number(p2.value)) <= 0) {
      //sane, prey
      if (crazy.checked === true){
        setTimeout(function(){
          document.getElementsByClassName("gametable")[0].rows[1].cells[2].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[2].cells[2].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[3].cells[2].style.backgroundColor = "#f4511e";
          pawn.src = "exit.png";
          submit.value = "Start"
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      } else {
        document.getElementsByClassName("gametable")[0].rows[1].cells[1].style.backgroundColor = "indigo";
        document.getElementsByClassName("gametable")[0].rows[1].cells[2].style.backgroundColor = "indigo";
        message.src = "prey.png";
        submit.value= "The Entrant Firm Acts...";
        setTimeout(function(){
          document.getElementsByClassName("gametable")[0].rows[1].cells[2].style.backgroundColor = "#f4511e";
          document.getElementsByClassName("gametable")[0].rows[2].cells[2].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[3].cells[2].style.backgroundColor = "#4CAF50";
          pawn.src = "exit.png";
          submit.value = "Start"
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      }
    } else {
      //somewhat rand
      var actionS = 2;
      if(crazy.checked === true){
        actionS = 3;
      } else {
        pmean = -(Number(p2.value)) / ((Number(d2.value) - Number(p2.value)));
        ymean = (pmean * (Number(sanityProb.value)/100) - pmean) / (pmean * (Number(sanityProb.value)/100) - (Number(sanityProb.value)/100));
        console.log("The incumbent preys with probability -> y_mean = (p_mean * p - p_mean) / (p_mean * p - p)", ymean);
        console.log("Where -> p_mean = p2 / (d2 - p2)", pmean);
        var actionS = 2;
        if (Math.random() < ymean){
          actionS = 1;
        }
        document.getElementsByClassName("gametable")[0].rows[actionS].cells[1].style.backgroundColor = "indigo";
        document.getElementsByClassName("gametable")[0].rows[actionS].cells[2].style.backgroundColor = "indigo";
        submit.value= "The Entrant Firm Acts...";
      }
      if(actionS == 1 || actionS == 3){
        message.src = "prey.png";
        setTimeout(function(){
          xmean = (Number(d1.value) - Number(p1.value)) / (Number(m1.value) - Number(d1.value));
          console.log("The entrant exits with probability -> x_mean = (d1 - p1) / (m1 - d1)", xmean);
          var actionR = 1;
          if (Math.random() < xmean){
            actionR = 2;
          }
          document.getElementsByClassName("gametable")[0].rows[1].cells[actionR].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[2].cells[actionR].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[3].cells[actionR].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[actionS].cells[actionR].style.backgroundColor = "#f4511e";
          if(actionR == 1){
            pawn.src = "stay.png";
          } else {
            pawn.src = "exit.png";
          }
          submit.value = "Start";
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      } else {
        message.src = "acc.png";
        setTimeout(function(){
          document.getElementsByClassName("gametable")[0].rows[1].cells[1].style.backgroundColor = "#4CAF50";
          document.getElementsByClassName("gametable")[0].rows[2].cells[1].style.backgroundColor = "#f4511e";
          document.getElementsByClassName("gametable")[0].rows[3].cells[1].style.backgroundColor = "#4CAF50";
          pawn.src = "stay.png";
          submit.value = "Start";
          disable('');
          tableButton.style.display = "block";
        }, 1000);
      }
    }
  }, 1000);
};