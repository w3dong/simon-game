var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("*").keypress(function(event) {
  if (!started) {
    started = true;
    nextSequence();
    $("#level-title").text("level " + level);
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer();
  }
});

function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColours[randomNum];
  $("#" + randomColor).fadeOut(90).fadeIn(90).fadeOut(90).fadeIn(90);
  playAudio(randomColor);
  level++;
  $("#level-title").text("level " + level);
  gamePattern.push(randomColor);
  userClickedPattern = [];
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

function gameFail() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  playAudio("wrong");
  $("#level-title").text("You Failed. Press A Key to try again");
  restart();
}

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      gameFail();
    }
  }
  if (started) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
function restart(){
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
