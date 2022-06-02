var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
  playSound(userChosenColor);
})

$(document).keypress(function() {
  if(!started) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
});

//$("#" + randomChosenColor).fadeOut(150).fadeIn(150);

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct");
    if(currentLevel === gamePattern.length -1){
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function animatePress(buttonColor) {
  $("#" + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function playSound(color) {
  switch(color) {
    case "blue" :
        var blue = new Audio("sounds/blue.mp3");
        blue.play();
        break;
    case "yellow" :
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
        break;
    case "green" :
        var green = new Audio("sounds/green.mp3");
        green.play();
        break;
    case "red" :
        var red = new Audio("sounds/red.mp3");
        red.play();
        break;
    case "wrong" :
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        break;
    default:
        console.log("Wrong soundtrack called, must be an issue!");
  }
}
