import Piece from './piece';
import GhostPiece from './ghostPiece';
import { WIDTH } from '../config/globals';

export default class PlayPiece extends Piece {
    constructor(x, y, type, graveyard) {
        super(graveyard);
        this.blocks = [];
        this.pivot = [];
        this.rotationIndex = 0;
        this.type = type;
        switch (type) {
        // O
        case 0:
            this.blocks = [[x, y], [x - 1, y], [x - 1, y - 1], [x, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'red';
            break;
        // I
        case 1:
            this.blocks = [[x, y], [x-1, y], [x-2, y], [x-3, y]];
            this.pivot = [x-2, y]
            this.colour = 'blue';
            break;
        // L
        case 2:
            this.blocks = [[x-2, y-1], [x-1, y-1], [x, y - 1], [x, y]];
            this.pivot = [x-1, y-1];
            this.colour = 'green';
            break;
        // J
        case 3:
            this.blocks = [[x-2, y], [x-2, y-1], [x-1, y - 1], [x, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'yellow';
            break;
        // T
        case 4:
            this.blocks = [[x, y-1], [x-1, y-1], [x-2, y-1], [x-1, y]];
            this.pivot = [x-1, y-1];
            this.colour = 'purple';
            break;
        // S
        case 5:
            this.blocks = [[x, y], [x-1, y-1], [x-1, y], [x-2, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'orange';
            break;
        // Z
        case 6:
            this.blocks = [[x-2, y], [x-1, y], [x-1, y-1], [x, y - 1]];
            this.pivot = [x-1, y-1];
            this.colour = 'pink';
            break;
        default:
            break;
        }
        this.ghostPiece = new GhostPiece(this);
    }

    canMoveLeft() {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[0] === 0) {
                result = false;
            }
            const x = block[0];
            const y = block[1];
            if (this.graveyard.blockTaken(x-1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveLeft() {
        if(this.canMoveLeft()) {
            this.blocks = this.blocks.map(([x,y]) => [x-1,y]);
            this.pivot[0]--;
            this.ghostPiece = new GhostPiece(this);
            // this.ghostPiece.moveToBottom();
        }
    }

    canMoveRight() {
        let result = true;
        this.blocks.forEach((block) => {
            if (block[0] === WIDTH - 1) {
                result = false;
            }
            const x = block[0];
            const y = block[1];
            if (this.graveyard.blockTaken(x+1, y)) {
                result = false;
            }
        });
        return result;
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.blocks = this.blocks.map(([x,y]) => [x+1, y]);
            this.pivot[0]++;
            this.ghostPiece = new GhostPiece(this);
        }
    }

    rotate(clockwise) {
        // Get rotation matrix
        let rotationMatrix = [];
        if (clockwise) {
            rotationMatrix = [[0, -1],[1,0]];
        } else {
            rotationMatrix = [[0,1],[-1,0]];
        }

        // Perform rotation
        let newBlocks = [];
        this.blocks.forEach((block) => {
            let ghostRelPiece = [this.pivot[0]-block[0], this.pivot[1]-block[1]];
            let ghostTurnedPiece = [
                ghostRelPiece[0] * rotationMatrix[0][0] + ghostRelPiece[1] * rotationMatrix[0][1],
                ghostRelPiece[0] * rotationMatrix[1][0] + ghostRelPiece[1] * rotationMatrix[1][1]
            ];
            newBlocks.push([this.pivot[0] + ghostTurnedPiece[0], this.pivot[1] + ghostTurnedPiece[1]]);
        });

        // Get offsets
        const prevIndex = this.rotationIndex;
        this.rotationIndex += clockwise ? 1 : -1;
        if (this.rotationIndex < 0) this.rotationIndex += 4;
        this.rotationIndex %= 4;
        const offsets = this.getOffsets(prevIndex, this.rotationIndex);

        // Apply offsets
        let offsetApplied = false;
        offsets.forEach((offset) => {
            if (offset.length === 0) {
                return;
            }
            const offsetNewBlocks = newBlocks.map(([x,y]) => [x+offset[0], y+offset[1]]);
            if (this.isValidMove(offsetNewBlocks) && !offsetApplied) {
                newBlocks = offsetNewBlocks;
                this.pivot = [this.pivot[0] + offset[0], this.pivot[1] + offset[1]];
                offsetApplied = true;
            }
        });

        if (offsetApplied) this.blocks = newBlocks;
        this.ghostPiece = new GhostPiece(this);
    }

    isValidMove(squares) {
        let result = true;
        squares.forEach((square) => {
            // Check its above the ground
            if (square[1] < 0) result = false;
            // Check its right of the left wall
            if (square[0] < 0) result = false;
            // Check its left of the right wall
            if (square[0] >= WIDTH) result = false;
            // Check it doesn't clash with the graveyard
            if (this.graveyard.blockTaken(square[0], square[1])) result = false;
        });
        // console.log(result);
        return result;
    }

    // Given the current rotation index and the previous index, it will give all offsets in order. 
    getOffsets(prevIndex, currIndex) {
        const oOffsets = [[0, 0], [0, -1], [-1, -1], [-1, 0]];
        const lOffsets = [
            [[0,0], [-1,0], [-1, 1], [0, 1]],
            [[-1, 0], [0,0], [1,1], [0,1]],
            [[2,0], [0,0], [-2,1], [0,1]],
            [[-1,0], [0,1], [1,0], [0,-1]],
            [[2,0], [0,-2], [-2,0],[0,2]]
        ];
        const otherOffsets = [
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[1,0],[0,0],[-1,0]],
            [[0,0],[1,-1],[0,0],[-1,-1]],
            [[0,0],[0,2],[0,0],[0,2]],
            [[0,0],[1,2],[0,0],[-1,2]]
        ];

        switch(this.type) {
            case 0:
                return [[
                    oOffsets[prevIndex][0] - oOffsets[currIndex][0], 
                    oOffsets[prevIndex][1] - oOffsets[currIndex][1]
            ]];
            case 1:
                return [
                    [
                        lOffsets[0][prevIndex][0] - lOffsets[0][currIndex][0], 
                        lOffsets[0][prevIndex][1] - lOffsets[0][currIndex][1]
                    ],
                    [
                        lOffsets[1][prevIndex][0] - lOffsets[1][currIndex][0], 
                        lOffsets[1][prevIndex][1] - lOffsets[1][currIndex][1]
                    ],
                    [
                        lOffsets[2][prevIndex][0] - lOffsets[2][currIndex][0], 
                        lOffsets[2][prevIndex][1] - lOffsets[2][currIndex][1]
                    ],
                    [
                        lOffsets[3][prevIndex][0] - lOffsets[3][currIndex][0], 
                        lOffsets[3][prevIndex][1] - lOffsets[3][currIndex][1]
                    ],
                    [
                        lOffsets[4][prevIndex][0] - lOffsets[4][currIndex][0], 
                        lOffsets[4][prevIndex][1] - lOffsets[4][currIndex][1]
                    ]
                ];
            default:
                return [
                    [
                        otherOffsets[0][prevIndex][0] - otherOffsets[0][currIndex][0], 
                        otherOffsets[0][prevIndex][1] - otherOffsets[0][currIndex][1]
                    ],
                    [
                        otherOffsets[1][prevIndex][0] - otherOffsets[1][currIndex][0], 
                        otherOffsets[1][prevIndex][1] - otherOffsets[1][currIndex][1]
                    ],
                    [
                        otherOffsets[2][prevIndex][0] - otherOffsets[2][currIndex][0], 
                        otherOffsets[2][prevIndex][1] - otherOffsets[2][currIndex][1]
                    ],
                    [
                        otherOffsets[3][prevIndex][0] - otherOffsets[3][currIndex][0], 
                        otherOffsets[3][prevIndex][1] - otherOffsets[3][currIndex][1]
                    ],
                    [
                        otherOffsets[4][prevIndex][0] - otherOffsets[4][currIndex][0], 
                        otherOffsets[4][prevIndex][1] - otherOffsets[4][currIndex][1]
                    ]
                ];
        }
    } 
}