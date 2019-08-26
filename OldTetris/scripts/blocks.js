/*
These are used for colouring behind the grid.
*/
function Block (leftX, topY) {
   let x = leftX;
   let y = topY;
   let color = 'black';

   function draw (newColor) {
      if (newColor) {
         drawRect (x * SIZE, y * SIZE, SIZE, SIZE, newColor);
      } else {
         drawRect (x * SIZE, y * SIZE, SIZE, SIZE, color);
      }
   }

   function changeColor (newColor) {
      color = newColor;
   }

   function getColor () {
      return color;
   }

   function xFunc (newX) {
      if (newX !== undefined) {
         x = newX;
      } else {
         return x;
      }
   }

   function yFunc (newY) {
      if (newY !== undefined) {
         y = newY;
      } else {
         return y;
      }
   }

   return {
      draw: draw,
      color: getColor,
      changeColor: changeColor,
      size: SIZE,
      x: xFunc,
      y: yFunc,
   }
}


/*
x axis = rows
y axis = columns
*/
function generateBlocks () {
   // Creating the array
   var blocks = [];
   for (let x = 0; x < WIDTH; x++) {
      blocks[x] = [];
   }

   // Filling the array
   for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
         let block = Block (x, y);
         blocks[x][y] = block;
      }
   }

   return blocks;
}

// Drawing the blocks on the screen
function drawBlocks () {
   for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
         blocks[x][y].draw ();
      }
   }
}

function changeColorBlocks (x, y, color) {
   blocks[x][y].changeColor (color);
}
