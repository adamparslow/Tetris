import Block from "./blocks";

export default class Graveyard {
    constructor() {
        this.deadBlocks = []
    }

    addPiece(piece) {
        piece.blocks.forEach((squarePos) => {
            const x = squarePos[0];
            const y = squarePos[1];

            this.deadBlocks.push(new Block(x, y, piece.colour));
        });
    }

    getColour(x, y) {
        let colour = "";
        this.deadBlocks.forEach((block) => {
            if (block.x === x && block.y === y) {
                colour = block.colour;
            }
        });
        return colour;
    }

    blockTaken(x, y) {
        let result = false;
        this.deadBlocks.forEach((block) => {
            if (block.x === x && block.y === y) {
                result = true;
            }
        });
        return result;
    }
}