export default class Piece {
    constructor (graveyard) {
        this.graveyard = graveyard;
    }
    
    getColour(x, y) {
        let isInPiece = false;
        this.blocks.forEach((block) => {
            if (block[0] === x && block[1] === y) {
                isInPiece = true;
            }
        });

        let isInGhost = false;
        this.ghostPiece.blocks.forEach((block) => {
            if (block[0] === x && block[1] === y) {
                isInGhost = true;
            }
        })

        return isInPiece ? this.colour : (isInGhost ? "grey" : "");
    }

    canMoveDown() {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[1] === 0) {
                result = false;
                return;
            }
            const x = block[0];
            const y = block[1];
            if (this.graveyard.blockTaken(x, y-1)) {
                result = false;
            }
        });
        return result;
    }

    moveDown() {
        if (this.canMoveDown()) {
            this.blocks = this.blocks.map(([x,y]) => [x, y-1]);
            this.pivot[1]--;
            return false;
        } else {
            return true;
        }
    }

    moveToBottom() {
        let cont = this.moveDown();
        while(this.canMoveDown()) {
            cont = this.moveDown();
        }
    }

}