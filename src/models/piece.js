import { WIDTH } from '../config/globals'

export default class Piece {
    constructor(x, y, type) {
        // this.x = x;
        // this.y = y;
        this.blocks = [];
        this.pivot = [];
        this.rotationIndex = 0;
        switch (type) {
        // O
        case 0:
            // this.blocks = [y*WIDTH + x, y*WIDTH + x + 1, (y+1)*WIDTH + x + 1, (y+1)*WIDTH + x];
            this.blocks = [[x, y], [x - 1, y], [x - 1, y - 1], [x, y - 1]];
            this.pivot = [x, y-1];
            this.colour = 'red';
            break;
        // I
        case 1:
            // this.blocks = [y*WIDTH + x, (y+1)*WIDTH + x, (y+2)*WIDTH + x, (y + 3)*WIDTH + x];
            this.blocks = [[x, y], [x-1, y], [x-2, y], [x-3, y]];
            this.pivot = [x-1, y]
            this.colour = 'blue';
            break;
        // L
        case 2:
            // this.blocks = [y*WIDTH + x, (y+1)*WIDTH + x, (y+2)*WIDTH + x, (y + 2)*WIDTH + x + 1];
            this.blocks = [[x-2, y-1], [x-1, y-1], [x, y - 1], [x, y]];
            this.pivot = [x-1, y-1];
            this.colour = 'green';
            break;
        // J
        case 3:
            // this.blocks = [y*WIDTH + x+1, (y+1)*WIDTH + x+1, (y+2)*WIDTH + x+1, (y + 2)*WIDTH + x];
            this.blocks = [[x-2, y], [x-2, y-1], [x-1, y - 1], [x, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'yellow';
            break;
        // T
        case 4:
            // this.blocks = [y*WIDTH + x, y*WIDTH + x+1, y*WIDTH + x+2, (y + 1)*WIDTH + x + 1];
            this.blocks = [[x, y-1], [x-1, y-1], [x-2, y-1], [x-1, y]];
            this.pivot = [x-1, y-1];
            this.colour = 'purple';
            break;
        // S
        case 5:
            // this.blocks = [(y+1)*WIDTH + x, (y+1)*WIDTH + x+1, y*WIDTH + x+1, y*WIDTH + x + 2];
            this.blocks = [[x, y], [x-1, y-1], [x-1, y], [x-2, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'orange';
            break;
        // Z
        case 6:
            // this.blocks = [y*WIDTH + x, y*WIDTH + x+1, (y+1)*WIDTH + x+1, (y+1)*WIDTH + x + 2];
            this.blocks = [[x-2, y], [x-1, y], [x-1, y-1], [x, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'pink';
            break;
        default:
            break;
        }
    }

    getColour(x, y) {
        let isInBlock = false;
        this.blocks.forEach((block) => {
            if (block[0] === x && block[1] === y) {
                isInBlock = true;
            }
        });

        return isInBlock ? this.colour : "";
    }

    canMoveDown(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[1] === 0) {
                result = false;
                return;
            }
            const x = block[0];
            const y = block[1];
            if (graveyard.blockTaken(x, y-1)) {
                result = false;
            }
        });
        return result;
    }

    moveDown(graveyard) {
        if (this.canMoveDown(graveyard)) {
            this.blocks = this.blocks.map(([x,y]) => [x, y-1]);
            this.pivot[1]--;
            return false;
        } else {
            graveyard.addPiece(this);
            return true;
        }
    }

    canMoveLeft(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[0] === 0) {
                result = false;
            }
            const x = block[0];
            const y = block[1];
            if (graveyard.blockTaken(x-1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveLeft(graveyard) {
        if(this.canMoveLeft(graveyard))
            this.blocks = this.blocks.map(([x,y]) => [x-1,y]);
            this.pivot[0]--;
    }

    canMoveRight(graveyard) {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[0] === WIDTH - 1) {
                result = false;
            }
            const x = block[0];
            const y = block[1];
            if (graveyard.blockTaken(x+1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveRight(graveyard) {
        if (this.canMoveRight(graveyard)) {
            this.blocks = this.blocks.map(([x,y]) => [x+1, y]);
            this.pivot[0]++;
        }
    }

    rotate(clockwise) {
        let rotationMatrix = [];
        if (clockwise) {
            rotationMatrix = [[0, -1],[1,0]];
        } else {
            rotationMatrix = [[0,1],[-1,0]];
        }

        if (this.pivot.length != 0) {
            let newBlocks = [];
            this.blocks.forEach((block) => {
                let ghostRelPiece = [this.pivot[0]-block[0], this.pivot[1]-block[1]];
                console.log(ghostRelPiece);
                let ghostTurnedPiece = [
                    ghostRelPiece[0] * rotationMatrix[0][0] + ghostRelPiece[1] * rotationMatrix[0][1],
                    ghostRelPiece[0] * rotationMatrix[1][0] + ghostRelPiece[1] * rotationMatrix[1][1]
                ];
                console.log(ghostTurnedPiece);
                newBlocks.push([this.pivot[0] + ghostTurnedPiece[0], this.pivot[1] + ghostTurnedPiece[1]]);
            });
            this.blocks = newBlocks;
            // let ghostRelPiece = this.blocks.map((block) => [this.pivot[0]-block[0], this.pivot[1]-block[1]]);
            // console.log(ghostRelPiece);
            // let ghostTurnedPiece = [
            //     ghostRelPiece[0] * rotationMatrix[0][0] + ghostRelPiece[1] * rotationMatrix[0][1],
            //     ghostRelPiece[0] * rotationMatrix[1][0] + ghostRelPiece[1] * rotationMatrix[1][1]
            // ];
            // console.log(ghostTurnedPiece);
            // this.blocks = [this.pivot[0] + ghostTurnedPiece[0], this.pivot[1] + ghostTurnedPiece[1]];
            // console.log(this.blocks);
        }
    }
}