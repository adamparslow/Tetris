export default class Piece {
    constructor(x, y, width, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.blocks = []
        switch (type) {
        // O
        case 0:
            this.blocks = [y*width + x, y*width + x + 1, (y+1)*width + x + 1, (y+1)*width + x];
            this.colour = 'red';
            break;
        // I
        case 1:
            this.blocks = [y*width + x, (y+1)*width + x, (y+2)*width + x, (y + 3)*width + x];
            this.colour = 'blue';
            break;
        // L
        case 2:
            this.blocks = [y*width + x, (y+1)*width + x, (y+2)*width + x, (y + 2)*width + x + 1];
            this.colour = 'green';
            break;
        // J
        case 3:
            this.blocks = [y*width + x+1, (y+1)*width + x+1, (y+2)*width + x+1, (y + 2)*width + x];
            this.colour = 'yellow';
            break;
        // T
        case 4:
            this.blocks = [y*width + x, y*width + x+1, y*width + x+2, (y + 1)*width + x + 1];
            this.colour = 'purple';
            break;
        // S
        case 5:
            this.blocks = [(y+1)*width + x, (y+1)*width + x+1, y*width + x+1, y*width + x + 2];
            this.colour = 'orange';
            break;
        // Z
        case 6:
            this.blocks = [y*width + x, y*width + x+1, (y+1)*width + x+1, (y+1)*width + x + 2];
            this.colour = 'pink';
            break;
        default:
            break;
        }
    }

    getColour(x, y) {
        let isInBlock = false;
        this.blocks.forEach((pos) => {
            if (pos === y * this.width + x) {
                isInBlock = true;
            }
        });

        return isInBlock ? this.colour : "Black";
    }

    moveDown() {
        if (this.y > 0) {
            this.y--;
            this.blocks = this.blocks.map(pos => pos-this.width);
        }
    }

    moveLeft() {

    }

    moveRight() {

    }

    rotate() {

    }
}