/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var playersGuess,
    winningNumber = generateWinningNumber(),
    prevGuesses = [],
    lives = 5,
	audio = new Audio('audio/fail.mp3');

/* **** Guessing Game Functions **** */
console.log("Winning Number is: " + winningNumber);

// Generate the Winning Number
function generateWinningNumber(){
	var winNum = Math.floor(Math.random() * (100)) + 1;
	return winNum;
}

// Fetch the Players Guess
function playersGuessSubmission(){
	$(document).ready(function() {
		var playersGuess = +$("#guess").val();
		$("#guess").val("");
		$("#hint").text("");
		checkGuess(playersGuess);
	});
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(guess){
	if (guess < winningNumber) {
		return "Your guess is lower than "
	}
	else {
		return "Your guess is higher than "
	}
}

// Check if the Player's Guess is the winning number 
function checkGuess(guess){
	if (isNaN(guess) || guess == "") {
		$(document).ready(function() {
			$("#result").text("Not a valid number, please try again!");
			$("#guessMessage").text("");
		});	
	}
	else if (guess == winningNumber) {
		$(document).ready(function() {
			$("h1").find('span').text("You Won!");
			$("#guessMessage").text("");
			$("body").css("background-color", "#BCED91");
			$("#result").text("");
			audio = new Audio('audio/snoop.mp3');
			audio.play();
			$("#bannerIM").attr("src", "img/thuglife.png")
		});	
	}
	else if (lives == 1) {
		$(document).ready(function() {
			audio = new Audio('audio/fail.mp3');
			audio.play();
			$("h1").find('span').text("Out of Lives. You Lost!");
			$("#guessMessage").text("");
			$("#result").text("");
			$("body").css("background-color", "#CD5C5C");
		
		});	
	}
	else if ($.inArray(guess, prevGuesses) == -1) {
		prevGuesses.push(guess);
		lives--;
		$(document).ready(function() {
			$("#result").text("Try Again!");
			guessMessage(guess);
		});	
	}
	else {
		$(document).ready(function() {
			$("#result").text("You already tried that number!");
			$("#guessMessage").text("");
		});	
	}
	console.log("Previous Guesses: " + prevGuesses);
	console.log("Number of lives: " + lives);
}

function guessMessage(guess) {
	var distance = Math.abs(winningNumber - guess);
	console.log("Distance is " + distance);
	var guessMessage;
	if (distance <= 5) {
		guessMessage = lowerOrHigher(guess) + "and within 5 digits of the Winning Number!";
	}
	else if (distance <= 10) {
		guessMessage = lowerOrHigher(guess) + "and within 10 digits of the Winning Number!";
	}
	else if (distance <= 20) {
		guessMessage = lowerOrHigher(guess) + "and within 20 digits of the Winning Number!";
	}
	else {
		guessMessage = lowerOrHigher(guess) + "and more than 20 digits away from the Winning Number!";
	}
	$(document).ready(function() {
		$("#guessMessage").text(guessMessage);
	});	
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	if (lives > 0) {
		var hint = "One of these values is the winning numbers: ";
		var possibilities = [];
		for (var i = 0; i < lives * 2; i++) {
			possibilities.push(generateWinningNumber());
		}
		// inserts the winning number in a random index
		var randomIndex = Math.floor(Math.random() * (lives * 2));
		possibilities[randomIndex] = winningNumber;
		hint = hint + possibilities.join(", ");
		hint += ". Submit a guess!";
		$(document).ready(function() {
			$("#hint").text(hint);
		});	
	}	
}

// Allow the "Player" to Play Again
function playAgain(){
	winningNumber = generateWinningNumber();
	prevGuesses = [];
	lives = 5;
	$(document).ready(function() {
		$("#result").text("");
		$("#guessMessage").text("");
		$("#hint").text("");
		$("body").css("background-color", "");
		$("h1").find('span').text("The Guessing Game");
		$("#bannerIM").attr("src", "img/fStack.png")
		audio.pause();
	});	
	console.log("New Winning Number is: " + winningNumber);
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function () {
	$('#guess').keydown(function(x) {
	    if (x.keyCode == 13) {
	        playersGuessSubmission();
	    }
	});
});