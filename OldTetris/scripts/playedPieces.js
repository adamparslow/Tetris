function createPlayedPieces () {
   var playedPieces = [];
   for (var x = 0; x < WIDTH; x++) {
      playedPieces[x] = [];
   }
   return playedPieces;
}

function createColorPieces () {
   let colorPieces = [];
   for (var x = 0; x < WIDTH; x++) {
      colorPieces[x] = [];
      for (var y = 0; y < HEIGHT; y++) {
         colorPieces[x][y] = undefined;
      }
   }
   return colorPieces;
}

function addPiece (piece, playedPieces, colorPieces) {
   piece.blocks.forEach (function (block) {
      playedPieces[block.x ()][block.y ()] = {
         block: block
      };
      colorPieces[block.x ()][block.y ()] = piece.color;
   });
}

function drawPlayedPieces (playedPieces, colorPieces) {
   let size = Block ().size;
   for (var x = 0; x < WIDTH; x++) {
      for (var y = 0; y < HEIGHT; y++) {
         if (colorPieces[x][y]) {
            drawRect (x * size, y * size, size, size, colorPieces[x][y]);
         }
      }
   }
}
