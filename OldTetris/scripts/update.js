var movedKeys = [];
var counter = 0;
var endCounter = 0;
var deleting = false;
var isReset = false;

function updateEverything () {
   checkForMovements (pressedKeys);
   if (isEndGame (playedPieces) === false) {
      moveDown ();
      if (checkForLineRemoval (playedPieces).length > 0 && !deleting) {
         deleting = true;
         playedPieces = removeLine (playedPieces, checkForLineRemoval (playedPieces), colorPieces);
      } else if (checkForLineRemoval (playedPieces).length === 0) {
         deleting = false;
      }
   } else {
      endGameLogistics (isReset);
   }
}

function checkForMovements (pKeys) {
   if (isEndGame (playedPieces) === false) {
      for (var key in pKeys) {
         if (pKeys[key]) {
            if (key === MOVEMENTS.UP && movedKeys[key] !== true) {
               piece.rotate ();
               movedKeys[key] = true;
            } else if (key === MOVEMENTS.LEFT && movedKeys[key] !== true) {
               // Checking that it is a valid move
               if (piece.isValid (MOVEMENTS.LEFT, playedPieces) === true) {
                  // Running if valid
                  piece.moveLeft ();
                  movedKeys[key] = true;
               }
            } else if (key === MOVEMENTS.RIGHT && movedKeys[key] !== true) {
               // Checking if it is a valid move
               if (piece.isValid (MOVEMENTS.RIGHT, playedPieces) === true) {
                  piece.moveRight ();
                  movedKeys[key] = true;
               }
            } else if (key === MOVEMENTS.DOWN) {
               if (piece.isValid (MOVEMENTS.DOWN, playedPieces) === true) {
                  piece.moveDown ();
               }
            }
         } else {
            movedKeys[key] = false;
         }
      }
   } else {
      if (pKeys[" "] === true) {
         isReset = true;
      }
   }
}

function moveDown () {
   if (piece.isValid (MOVEMENTS.DOWN, playedPieces) === true) {
      if (counter === FRAMES_PER_SEC / 2) {
         piece.moveDown ();
         counter = 0;
      } else {
         counter++;
      }
   } else {
      if (endCounter < 7) {
         endCounter++;
      } else {
         newPiece ();
      }
   }
}

function newPiece () {
   // Move old piece to played pieces
   addPiece (piece, playedPieces, colorPieces);

   // Create new piece
   piece = Piece (4, 0);
}
