// Patterns
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = false;
//==============================================================================

// Colours
let buttonColours = ["red", "blue", "green", "yellow"];
//==============================================================================

// Game Start
// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });
$(document).keydown(function(event){
  let started = event.originalEvent.isTrusted;
  if (started === true){
    nextSequence();
    $("h1").html("Level " + level);
  } else {
    console.log(event);
  }
});
//==============================================================================

// User behaviour
$(".btn").click(function(event) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
//==============================================================================

//Restart Game Function
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

//==============================================================================

//Check Answer Function
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("ok");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over")
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    startOver();
  }
}
  //==============================================================================
  // Play Sound Function
  function playSound(name) {
    let colourAudio = new Audio("sounds/" + name + ".mp3");
    colourAudio.play();
  }
  //==============================================================================

  // Press Animation Function
  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100)
  }
  //==============================================================================

  //Game Sequence Function
  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  //==============================================================================
