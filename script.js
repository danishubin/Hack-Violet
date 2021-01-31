// Convert time to a format of hours, minutes, seconds, and milliseconds


myStorage = window.sessionStorage;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;
let count = 0;
let pauseCount = 0;

// Create function to modify innerHTML

function print(txt, id) {
  document.getElementById(id).innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
  startTime = Date.now() - elapsedTime;
  if (count == pauseCount){
    if (count < 5){
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime), "display");
        print(count.toString() + " / 5 breaths completed", "counts");
      }, 10);
      count ++;
    }
  }
}

function pause() {
  if (count == pauseCount + 1){
    pauseCount ++;
    print(document.getElementById("time").textContent + " " + timeToString(elapsedTime), "time");
    clearInterval(timerInterval);
    print("00:00:00", "display");
    elapsedTime = 0;
  }

  if (count >= 5){
    hideButtons();
    showComplete();
  }
}

function retry() {
  count = 0;
  pauseCount = 0;
  print("", "time");
  clearInterval(timerInterval);
  print("00:00:00", "display");
  elapsedTime = 0;
  showButtons();
  print("0 / 5 breaths completed", "counts");
  hideComplete();
}


function hideButtons() {
  const buttonToHide1 = playButton;
  const buttonToHide = pauseButton;
  buttonToHide1.style.display = "none";
  buttonToHide.style.display = "none";
  breathingRate();
}


function showButtons(){
  const buttonToHide1 = playButton;
  const buttonToHide = pauseButton;
  buttonToHide1.style.display = "block";
  buttonToHide.style.display = "block";
}


function breathingRate(){
  let allTimes = (document.getElementById("time").textContent).trim();
  let sum = 0;
  split = allTimes.split(" ");
  for (let i = 0; i < split.length; i++){
    sum += parseInt(timeToInt(split[i]));
  }
  sessionStorage.setItem('avTime', (sum / 5));

  // Get saved data from sessionStorage
  let data = sessionStorage.getItem('avTime');
  console.log(data);
}

function showComplete(){
  complete.style.display = "block";
}

function hideComplete(){
  complete.style.display = "none";
}

function timeToInt(time){
  let split = time.split(":");
  let intTime = 0
  for (let i = split.length - 1; i > -1; i --){
    if (i == split.length - 1){
      intTime += parseInt(split[i]);
    } else if (i == split.length - 2){
      intTime += parseInt(split[i]) * 1000;
    } else{
      intTime += parseInt(split[i]) * 60000;
    }
  }
  return intTime;
}

let complete = document.getElementById("completed");


