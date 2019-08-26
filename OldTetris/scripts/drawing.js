/*
Drawing Structure; gameCanvas
Blocks for coloring
Borders around the colouring
*/
function drawEverything () {
   if (isEndGame (playedPieces) === false) {
      drawRect (0, 0, canvas.width, canvas.height, 'black');
      drawBlocks ();
      piece.draw ();
      drawPlayedPieces (playedPieces, colorPieces);
      drawGrid ();
      score.draw ();
   } else {
      endGameDisplay ();
   }
   highScore.draw ();
}

function drawRect (leftX, topY, width, height, drawColor) {
   canvasContext.fillStyle = drawColor;
   canvasContext.fillRect (leftX, topY, width, height);
}

function drawGrid () {
   var block = Block ();
   for (var x = 0; x <= WIDTH; x++) {
      drawRect (x * block.size - 0.5, 0, 1, canvas.height, 'white');
   }

   for (var y = 0; y <= HEIGHT; y++) {
      drawRect (0, y * block.size - 0.5,  canvas.width, 1, 'white');
   }
}
