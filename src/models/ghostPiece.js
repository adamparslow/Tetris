import Piece from './piece';

export default class GhostPiece extends Piece {
    constructor(playPiece) {
        super(playPiece.graveyard); 
        this.blocks = [...playPiece.blocks];
        this.pivot = [...playPiece.pivot];
        this.moveToBottom();
    }
}