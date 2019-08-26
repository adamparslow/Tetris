function Piece (leftX, topY) {
   var x = leftX;
   var y = topY;

   var blocks = [];
   var pieceType = Math.floor (Math.random () * 7);

   var pieceInfo = pieceInfoGen (pieceType, x, y);

   function drawPiece () {
      pieceInfo.blocks.forEach (function (block) {
         block.draw (pieceInfo.color);
      });
   }

   function moveDown () {
      pieceInfo.blocks.forEach (function (block) {
         var newY = block.y () + 1;
         block.y (newY);
      });
      y++;
   }

   function moveLeft () {
      pieceInfo.blocks.forEach (function (block) {
         var newX = block.x () - 1;
         block.x (newX);
      });
      x--;
   }

   function moveRight () {
      if (x !== 7) {
         pieceInfo.blocks.forEach (function (block) {
            var newX = block.x () + 1;
            block.x (newX);
         });
         x++;
      } else {
         pieceInfo.blocks.forEach (function (block) {
            block.x (8);
         })
         x = 8;
      }
   }

   function rotate () {
      if (true) { // ***** CHECK FOR OVERLAP WITH PLAYEDPIECES
         if (x > WIDTH - 3) {
            if (isValid (MOVEMENTS.LEFT, playedPieces)) {
               moveLeft ();
            }
         }

         // For all pieces other than I and O
         if (pieceType > 1) {
            // ---- Convert the piece into an array ----

            // Generate array
            var rotateArray = [];
            for (let i = 0; i < 3; i++) { rotateArray[i] = []; }

            // Place blocks onto the array
            for (var i = 0; i < pieceInfo.blocks.length; i++) {
               rotateArray[pieceInfo.blocks[i].x () - x][pieceInfo.blocks[i].y () - y] = {
                  block: pieceInfo.blocks[i],
                  arrayPos: i
               };
            }

            for (var ix = 0; ix < 3; ix++) {
               for (var iy = 0; iy < 3; iy++) {
                  if (rotateArray[ix][iy] === undefined) {
                     rotateArray[ix][iy] = "Empty";
                  }
               }
            }

            rotateArray = arrayRotate (rotateArray);

            pieceInfo.moveKeys.left = findLeft (rotateArray);
            pieceInfo.moveKeys.up = findUp (rotateArray);
            pieceInfo.moveKeys.right = findRight (rotateArray);
            pieceInfo.moveKeys.down = findDown (rotateArray);

            pieceInfo.blocks = [];

            for (var ix = 0; ix < 3; ix++) {
               for (var iy = 0; iy < 3; iy++) {
                  if (rotateArray[ix][iy] !== "Empty") {
                     rotateArray[ix][iy].block.x (ix + x);
                     rotateArray[ix][iy].block.y (iy + y);
                     pieceInfo.blocks[rotateArray[ix][iy].arrayPos] = rotateArray[ix][iy].block;
                  }
               }
            }
         // Rotating the I
         } else if (pieceType === 1) {
            let position = 0;

            // Identify its rotational position: _ or |
            if ((pieceInfo.blocks[1].x () - pieceInfo.blocks[0].x ()) === 0) {
               position = 0;
            } else {
               position = 1;
            }

            // Make the x values the y values and the y values the x values
            let xRelative = [];
            let yRelative = [];
            let xAbsolute = pieceInfo.blocks[0].x ();
            let yAbsolute = pieceInfo.blocks[0].y ();
            for (var i = 0; i < 4; i++) {
               xRelative[i] = pieceInfo.blocks[i].x () - xAbsolute;
               yRelative[i] = pieceInfo.blocks[i].y () - yAbsolute;
            }

            // To fix the error that I have been having
            if (xAbsolute === 7) {

            } else if (xAbsolute === 8) {
               xAbsolute = 9;
            }
            // If the piece excedes the right side move it back
            if (position === 0 && xAbsolute > 6) {
               xAbsolute = 6;
               x = 6;
            }
            if (position === 1 && yAbsolute > 16) {
               yAbsolute = 16;
            }

            // Rotates the piece
            for (var i = 0; i < 4; i++) {
               pieceInfo.blocks[i].x (yRelative[i] + xAbsolute);
               pieceInfo.blocks[i].y (xRelative[i] + yAbsolute);
            }

            // Switch the side idefitification arrays
            if (position === 0) {
               let temp = pieceInfo.moveKeys.up;
               pieceInfo.moveKeys.up = pieceInfo.moveKeys.right;
               pieceInfo.moveKeys.right = pieceInfo.moveKeys.down;
               pieceInfo.moveKeys.down = pieceInfo.moveKeys.left;
               pieceInfo.moveKeys.left = temp;
            } else {
               let temp = pieceInfo.moveKeys.up;
               pieceInfo.moveKeys.up = pieceInfo.moveKeys.left;
               pieceInfo.moveKeys.left = pieceInfo.moveKeys.down;
               pieceInfo.moveKeys.down = pieceInfo.moveKeys.right;
               pieceInfo.moveKeys.right = temp;
            }
         }
      }
   }

   // Rotating of the 3x3 array
   function arrayRotate (pieceArray) {
      // Rotate sides
      let temp = pieceArray[1][0];
      pieceArray[1][0] = pieceArray[0][1];
      pieceArray[0][1] = pieceArray[1][2];
      pieceArray[1][2] = pieceArray[2][1];
      pieceArray[2][1] = temp;

      // pieceArray corners
      temp = pieceArray[0][0];
      pieceArray[0][0] = pieceArray[0][2];
      pieceArray[0][2] = pieceArray[2][2];
      pieceArray[2][2] = pieceArray[2][0];
      pieceArray[2][0] = temp;

      // Shifting
      if (pieceArray[0][0] === "Empty" && pieceArray[0][1] === "Empty" && pieceArray[0][2] === "Empty") {
         pieceArray[0][0] = pieceArray[1][0];
         pieceArray[0][1] = pieceArray[1][1];
         pieceArray[0][2] = pieceArray[1][2];

         pieceArray[1][0] = pieceArray[2][0];
         pieceArray[1][1] = pieceArray[2][1];
         pieceArray[1][2] = pieceArray[2][2];

         pieceArray[2][0] = "Empty";
         pieceArray[2][1] = "Empty";
         pieceArray[2][2] = "Empty";
      }

      if (pieceArray[0][0] === "Empty" && pieceArray[1][0] === "Empty" && pieceArray[2][0] === "Empty") {
         pieceArray[0][0] = pieceArray[0][1];
         pieceArray[1][0] = pieceArray[1][1];
         pieceArray[2][0] = pieceArray[2][1];

         pieceArray[0][1] = pieceArray[0][2];
         pieceArray[1][1] = pieceArray[1][2];
         pieceArray[2][1] = pieceArray[2][2];

         pieceArray[0][2] = "Empty";
         pieceArray[1][2] = "Empty";
         pieceArray[2][2] = "Empty";
      }

      return pieceArray;
   }

   // Finding which pieces lie on which side
   function findLeft (pieceArray) {
      let left = [];
      for (var i = 0; i < 3; i++) {
         let foundPiece = true;;
         for (var j = 0; j < 3 && foundPiece; j++) {
            if (pieceArray[j][i] !== "Empty") {
               foundPiece = false;
               left.push (pieceArray[j][i].arrayPos);
            }
         }
      }

      return left;
   }

   function findUp (pieceArray) {
      let up = [];
      for (var i = 2; i > -1; i--) {
         let foundPiece = true;;
         for (var j = 0; j < 3 && foundPiece; j++) {
            if (pieceArray[i][j] !== "Empty") {
               foundPiece = false;
               up.push (pieceArray[i][j].arrayPos);
            }
         }
      }

      return up;
   }

   function findRight (pieceArray) {
      let right = [];
      for (var i = 2; i > -1; i--) {
         let foundPiece = true;;
         for (var j = 2; j > -1 && foundPiece; j--) {
            if (pieceArray[j][i] !== "Empty") {
               foundPiece = false;
               right.push (pieceArray[j][i].arrayPos);
            }
         }
      }

      return right;
   }

   function findDown (pieceArray) {
      let down = [];
      for (var i = 0; i < 3; i++) {
         let foundPiece = true;
         for (var j = 2; j > -1 && foundPiece; j--) {
            if (pieceArray[i][j] !== "Empty") {
               foundPiece = false;
               down.push (pieceArray[i][j].arrayPos);
            }
         }
      }

      return down;
   }

   function isValid (movement, playedPieces) {
      var isValid = true; // True until proven false

      if (movement === MOVEMENTS.LEFT) {
         pieceInfo.moveKeys.left.forEach (function (pieceIndex) {
            // Check that it wont move out of the board
            if (pieceInfo.blocks[pieceIndex].x () - 1 < 0) {
               isValid = false;
            }

            // Check it wont overlap playedPieces
            for (var x = 0; x < WIDTH; x++) {
               for (var y = 0; y < HEIGHT; y++) {
                  if (playedPieces[x][y]) {
                     if (pieceInfo.blocks[pieceIndex].x () - 1 === x && pieceInfo.blocks[pieceIndex].y () === y)  {
                        isValid = false;
                     }
                  }
               }
            }
         });

      } else if (movement === MOVEMENTS.RIGHT) {
         pieceInfo.moveKeys.right.forEach (function (pieceIndex) {
            //Check it wont move out of the board
            if (pieceInfo.blocks[pieceIndex].x () + 1 === WIDTH) {
               isValid = false;
            }

            // Check it wont overlap playedPieces
            for (var x = 0; x < WIDTH; x++) {
               for (var y = 0; y < HEIGHT; y++) {
                  if (playedPieces[x][y]) {
                     if (pieceInfo.blocks[pieceIndex].x () + 1 === x && pieceInfo.blocks[pieceIndex].y () === y) {
                        isValid = false;
                     }
                  }
               }
            }
         });
      } else if (movement === MOVEMENTS.DOWN) {
         pieceInfo.moveKeys.down.forEach (function (pieceIndex) {
            //Check it wont move out of the board
            if (pieceInfo.blocks[pieceIndex].y () + 1 === HEIGHT) {
               isValid = false;
            }

            // Check it wont overlap playedPieces
            for (var x = 0; x < WIDTH; x++) {
               for (var y = 0; y < HEIGHT; y++) {
                  if (playedPieces[x][y]) {
                     if (pieceInfo.blocks[pieceIndex].x () === x && pieceInfo.blocks[pieceIndex].y () + 1 === y) {
                        isValid = false;
                     }
                  }
               }
            }
         });
      }

      return isValid;
   }

   return {
      // Functions for general use
      draw: drawPiece,
      moveDown: moveDown,
      moveLeft: moveLeft,
      moveRight: moveRight,
      rotate: rotate,
      isValid: isValid,

      // Bad practise, use with care
      blocks: pieceInfo.blocks,
      color: pieceInfo.color
   }
}

function pieceInfoGen (pieceType, x, y) {
   var blocks = [];
   var color = '';
   var moveKeys = {};

   switch (pieceType) {
      // O
      case 0:
      blocks = [Block (x, y), Block (x + 1, y), Block (x + 1, y + 1), Block (x, y + 1)];
      color = 'red';
      moveKeys = {
         left: [0, 3],
         up: [0, 1],
         right: [1, 2],
         down: [2, 3]
      }
      break;

      // I
      case 1:
      blocks = [Block (x, y), Block (x, y + 1), Block (x, y + 2), Block (x, y + 3)];
      color = 'blue';
      moveKeys = {
         left: [0, 1, 2, 3],
         up: [0],
         right: [0, 1, 2, 3],
         down: [3]
      }
      break;

      // L
      case 2:
      blocks = [Block (x, y), Block (x, y + 1), Block (x, y + 2), Block (x + 1, y + 2)];
      color = 'green';
      moveKeys = {
         left: [0, 1, 2],
         up: [0, 3],
         right: [0, 1, 3],
         down: [2, 3]
      }
      break;

      // J
      case 3:
      blocks = [Block (x + 1, y), Block (x + 1, y + 1), Block (x + 1, y + 2), Block (x, y + 2)];
      color = 'yellow';
      moveKeys = {
         left: [0, 1, 3],
         up: [0, 3],
         right: [0, 1, 2],
         down: [2, 3]
      }
      break;

      // T
      case 4:
      blocks = [Block (x, y), Block (x + 1, y), Block (x + 2, y), Block (x + 1, y + 1)];
      color = 'purple';
      moveKeys = {
         left: [0, 3],
         up: [0, 1, 2],
         right: [2, 3],
         down: [0, 2, 3]
      }
      break;

      // S
      case 5:
      blocks = [Block (x, y + 1), Block (x + 1, y + 1), Block (x + 1, y), Block (x + 2, y)];
      color = 'orange';
      moveKeys = {
         left: [0, 2],
         up: [0, 2, 3],
         right: [3, 1],
         down: [0, 1, 3]
      }
      break;

      // Z
      case 6:
      blocks = [Block (x, y), Block (x + 1, y), Block (x + 1, y + 1), Block (x + 2, y + 1)];
      color = 'pink';
      moveKeys = {
         left: [0, 2],
         up: [0, 1, 3],
         right: [1, 3],
         down: [0, 2, 3]
      }
      break;
   }

   return {
      blocks: blocks,
      color: color,
      moveKeys: moveKeys
   }
}
