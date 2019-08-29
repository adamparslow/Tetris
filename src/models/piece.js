import { WIDTH } from '../config/globals'

export default class Piece {
    constructor(x, y, type) {
        // this.x = x;
        // this.y = y;
        this.blocks = []
        switch (type) {
        // O
        case 0:
            this.blocks = [y*WIDTH + x, y*WIDTH + x + 1, (y+1)*WIDTH + x + 1, (y+1)*WIDTH + x];
            this.colour = 'red';
            break;
        // I
        case 1:
            this.blocks = [y*WIDTH + x, (y+1)*WIDTH + x, (y+2)*WIDTH + x, (y + 3)*WIDTH + x];
            this.colour = 'blue';
            break;
        // L
        case 2:
            this.blocks = [y*WIDTH + x, (y+1)*WIDTH + x, (y+2)*WIDTH + x, (y + 2)*WIDTH + x + 1];
            this.colour = 'green';
            break;
        // J
        case 3:
            this.blocks = [y*WIDTH + x+1, (y+1)*WIDTH + x+1, (y+2)*WIDTH + x+1, (y + 2)*WIDTH + x];
            this.colour = 'yellow';
            break;
        // T
        case 4:
            this.blocks = [y*WIDTH + x, y*WIDTH + x+1, y*WIDTH + x+2, (y + 1)*WIDTH + x + 1];
            this.colour = 'purple';
            break;
        // S
        case 5:
            this.blocks = [(y+1)*WIDTH + x, (y+1)*WIDTH + x+1, y*WIDTH + x+1, y*WIDTH + x + 2];
            this.colour = 'orange';
            break;
        // Z
        case 6:
            this.blocks = [y*WIDTH + x, y*WIDTH + x+1, (y+1)*WIDTH + x+1, (y+1)*WIDTH + x + 2];
            this.colour = 'pink';
            break;
        default:
            break;
        }
    }

    getColour(x, y) {
        let isInBlock = false;
        this.blocks.forEach((pos) => {
            if (pos === y * WIDTH + x) {
                isInBlock = true;
            }
        });

        return isInBlock ? this.colour : "";
    }

    canMoveDown(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block - WIDTH < 0) {
                result = false;
                return;
            }
            const x = block % WIDTH;
            const y = Math.floor(block / WIDTH);
            if (graveyard.blockTaken(x, y-1)) {
                result = false;
            }
        });
        return result;
    }

    moveDown(graveyard) {
        if (this.canMoveDown(graveyard)) {
            this.blocks = this.blocks.map(pos => pos-WIDTH);
            return false;
        } else {
            graveyard.addPiece(this);
            return true;
        }
    }

    canMoveLeft(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block % WIDTH === 0) {
                result = false;
            }
            const x = block % WIDTH;
            const y = Math.floor(block / WIDTH);
            if (graveyard.blockTaken(x-1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveLeft(graveyard) {
        if(this.canMoveLeft(graveyard))
            this.blocks = this.blocks.map(pos => pos - 1);
    }

    canMoveRight(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block % WIDTH === WIDTH - 1) {
                result = false;
            }
            const x = block % WIDTH;
            const y = Math.floor(block / WIDTH);
            if (graveyard.blockTaken(x+1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveRight(graveyard) {
        if (this.canMoveRight(graveyard)) {
            this.blocks = this.blocks.map(pos => pos + 1);
        }
    }

    rotate() {

    }
}