import { WIDTH } from "../config/globals";
import Block from "./blocks";

export default class Graveyard {
    constructor() {
        this.deadBlocks = []
    }

    addPiece(piece) {
        piece.blocks.forEach((squarePos) => {
            const x = squarePos % WIDTH;
            const y = Math.floor(squarePos / WIDTH);

            this.deadBlocks.push(new Block(x, y, piece.colour));
        });

        console.log(this.deadBlocks);
    }

    getColour(x, y) {
        let colour = "";
        this.deadBlocks.forEach((block) => {
            if (block.x === x && block.y === y) {
                console.log("does this ever happen");
                colour = block.colour;
            }
        });
        return colour;
    }
}