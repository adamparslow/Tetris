/*
Things to do:
Set up removing lines
Set up end of the game
Points scoring

*/

// Creates score object that deals with all score related information
function score () {
   let score = 0;

   function updateScore () {
      score += 100;
   }

   function getScore () {
      return score;
   }

   function drawScore () {
      document.getElementById('score').innerHTML = "Score: " + score.toString ();
   }

   function setScore (number) {
      score = number;
   }

   return {
      update: updateScore,
      draw: drawScore,
      score: getScore,
      setScore: setScore
   }
}

function highScore () {
   let highScore = 0;

   function updateHighScore (score) {
      if (score > highScore) {
         highScore = score;
      }
   }

   function drawHighScore () {
      document.getElementById('highScore').innerHTML = "High Score: " + highScore.toString ();
   }

   return {
      update: updateHighScore,
      draw: drawHighScore
   }
}

// Searches the entire game board for rows to be deleted
// Returns them in an integer array
function checkForLineRemoval (playedPieces) {
   let isAllBlocks = true;
   let rowsForDeletion = [];
   for (var y = HEIGHT - 1; y >= 0; y--) {
      isAllBlocks = true;
      for (var x = 0; x < WIDTH; x++) {
         if (playedPieces[x][y] === undefined) {
            isAllBlocks = false;
         }
      }
      if (isAllBlocks) {
         rowsForDeletion.push (y);
      }
   }

   return rowsForDeletion;
}

function removeLine (playedPieces, linesToRemove, colorPieces) {
   // Loop through each line that need removing
   for (var i = 0; i < linesToRemove.length; i++) {
      var lineNum = linesToRemove[i];
      // remove the line
      for (var x = 0; x < WIDTH; x++) {
         playedPieces[x][lineNum] = undefined;
         colorPieces[x][lineNum] = 'black';
      }

      // moves the lines down
      for (var y = lineNum; y > 0; y--) {
         for (var x = 0; x < WIDTH; x++) {
            playedPieces[x][y] = playedPieces[x][y - 1];
            colorPieces[x][y] = colorPieces[x][y - 1];
         }
      }

      // Set the top pieces to be undefined
      for (var x = 0; x < WIDTH; x++) {
         playedPieces[x][0] = undefined;
      }

      for (var j = i; j < linesToRemove.length; j++) {
         linesToRemove[j] = linesToRemove[j] + 1;
      }

      score.update ();
   }

   return playedPieces;
}

function endGameLogistics () {
   highScore.update (score.score ());
   if (isReset) {
      playedPieces = createPlayedPieces ();
      colorPieces = createColorPieces ();
      piece = Piece (4, 0);
      score.setScore (0);
      isReset = false;
      document.getElementById('endGame').innerHTML = "";
      document.getElementById('endGameText').innerHTML = "";
   }
}

function endGameDisplay () {
   document.getElementById('endGame').innerHTML = "GAME OVER";
   document.getElementById('endGameText').innerHTML = "To restart the game, press the space bar";
}

function isEndGame (playedPieces) {
   var isAtTop = false;
   for (var x = 0; x < WIDTH; x++) {
      if (playedPieces[x][0] !== undefined) {
         isAtTop = true;
      }
   }
   return isAtTop;
}
