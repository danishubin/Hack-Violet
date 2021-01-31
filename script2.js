var audioEl = null;
var period = 10000; // [miliseconds]
var circleAnime;
var count = 0;
var down = false;

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onload = function(event){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius_max = 70;
    var color = 0;
    drawCircle(canvas, context, centerX, centerY, radius_max, color);
};


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function start(){
  console.log("1");
  audioEl = document.getElementById("audio");
  audioEl.play();
  period =  Math.round(sessionStorage.getItem('avTime'));
  if (period == 0){
    period = 10000;
  }
  console.log(period);
  myCanvas = document.getElementById("myCanvas");
  myCanvas.style.animationDuration = period + "ms";
  myCanvas.style.animationPlayState = "running";
  // console.log(Math.round(sessionStorage.getItem('avTime')));
  // var canvas = document.getElementById('myCanvas');
  // var context = canvas.getContext('2d');
  // var centerX = canvas.width / 2;
  // var centerY = canvas.height / 2;
  // var radius_max = 70;
  // var color = 0;
  // circleAnime = setInterval(function () {
    // drawCircle(canvas, context, centerX, centerY, radius_max, color);
  // }, (period / 50));
}

function stop(){
  // console.log("2");
  // clearInterval(circleAnime);
  myCanvas = document.getElementById("myCanvas");
  myCanvas.style.animationPlayState = "paused";
  audioEl = document.getElementById("audio");
  audioEl.pause();
}

function drawCircle(canvas, context, centerX, centerY, radius_max, color){
  // var linearMod = (count) % period / period; // this goes from 0 to 1
  // // var mod = Math.sin(linearMod * Math.PI); // and here with simple easing we create some bouncing
  // if (!down && count < radius_max){
  //   count++;
  // } else if (!down && count == radius_max) {
  //   down = true;
  //   count--;
  // } else if (down && count > 0) {
  //   count--;
  // } else if (down && count == 0) {
  //   count++;
  //   down = false;
  // }
  // console.log(count);
  canvas.width = canvas.width;
  context.beginPath();
  context.arc(centerX, centerY, radius_max, 0, 2 * Math.PI, false);
  context.fillStyle = '#ccdbee';
  context.fill();
}

function togglePlay(){
  var buttonE = document.getElementById("togglePlay");
  console.log(playButton.src);
  if (playButton.src == "https://res.cloudinary.com/https-tinloof-com/image/upload/v1593360448/blog/time-in-js/play-button_opkxmt.svg"){
    chooseSong();
    //currently paused so must start
    start();
    playButton.src = "https://res.cloudinary.com/https-tinloof-com/image/upload/v1593360448/blog/time-in-js/pause-button_pinhpy.svg";

  } else{
    stop();
    playButton.src = "https://res.cloudinary.com/https-tinloof-com/image/upload/v1593360448/blog/time-in-js/play-button_opkxmt.svg";
  }
}

function chooseSong(){
  var list = document.getElementById("soundTrack");
  var result = list.options[list.selectedIndex].value;
  audioEl = document.getElementById("audio");
  audioEl.muted = false;
  if (result == "none"){
    audioEl.muted = true;
  } else if(result == "instrumental"){
    audioEl.src = "Instrumental.mp3";
  } else if(result == "calm"){
    audioEl.src = "Calm music.mp3";
  } else if(result == "nature"){
    audioEl.src = "Nature sounds.mp3";
  } else if(result == "rain"){
    audioEl.src = "Rain.mp3";
  } else if(result == "ocean"){
    audioEl.src = "Ocean sounds.mp3";
  }
}