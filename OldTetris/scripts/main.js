// Game constants
const SIZE = 40;
const FRAMES_PER_SEC = 30;
const WIDTH = 10;
const HEIGHT = 20;

const MOVEMENTS = {
   UP: "ArrowUp",
   DOWN: "ArrowDown",
   LEFT: "ArrowLeft",
   RIGHT: "ArrowRight"
}

var canvas, canvasContext;
var blocks;
var piece;
var playedPieces;
var score;
var highScore;

var pressedKeys = [];

// ----- Events ----- //
// Setting up the game board
window.onload = function () {
   canvas = document.getElementById ('gameCanvas');
   canvasContext = canvas.getContext ('2d');

   canvas.width = WIDTH * SIZE;
   canvas.height = HEIGHT * SIZE;

   blocks = generateBlocks ();
   playedPieces = createPlayedPieces ();
   colorPieces = createColorPieces ();
   piece = Piece (4, 0);
   score = score ();
   highScore = highScore ();

   setInterval (intervalFunc, 1000/FRAMES_PER_SEC);
}

document.onkeydown = function (evt) {
   if (pressedKeys[evt.key] !== true) {
      pressedKeys[evt.key] = true;
   }
}

document.onkeyup = function (evt) {
   if (pressedKeys[evt.key] === true) {
      pressedKeys[evt.key] = false;
   }
}


// ----- MAIN FUNCTIONS ----- //
function intervalFunc () {
   drawEverything ();
   updateEverything ();
}
