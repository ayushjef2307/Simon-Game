var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = -1;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;   
    console.log(level);
    $("h1").text("level " + level );
    
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);

    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
});

function playSound(name) {
    var audio = new Audio("/Simon Game Challenge Starting Files/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

$(document).on("keydown" , function () {
    if (level == -1) {
         nextSequence();
    }
}); 

function checkAnswer(currentLevel) {

    if( userClickedPattern[currentLevel] === gamePattern[currentLevel] )
    {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 150);
        }
    }
    else{

        var audio = new Audio("/Simon Game Challenge Starting Files/sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = -1;
}