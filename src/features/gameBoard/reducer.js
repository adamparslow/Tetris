import { HEIGHT, WIDTH } from "../../config/globals";
import Piece from '../../models/Piece'

let initialState = {
    squares: [],
    piece: new Piece(5, 5, 6)
}

for (let x = 0; x < WIDTH; x++) {
    let newColumn = [];
    for (let y = 0; y < HEIGHT; y++) {
        newColumn.push("black");
    }
    initialState.squares.push(newColumn);
}

paintPiece(initialState.squares, initialState.piece);

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case "MOVE_PIECE_DOWN":
            let newState = movePieceDown(state);
            return newState;
        default:
            return state;
    }
}

function movePieceDown(state) {
    console.log(state);
    setToBlack(state.squares);
    state.piece.moveDown();
    paintPiece(state.squares, state.piece);
    return {
        ...state
    };
}

function setToBlack(squares) {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            squares[x][y] = "black";
        }
    }
}

function paintPiece(squares, piece) {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            squares[x][y] = piece.getColour(x, y);
        }
    }
}

export default gameReducer;