import { HEIGHT, WIDTH } from "../../config/globals";
import Piece from '../../models/piece'
import Graveyard from "../../models/graveyard";

let initialState = {
    squares: [],
    piece: new Piece(3, HEIGHT, 6),
    graveyard: new Graveyard()
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
            return movePieceDown(state);
        case "MOVE_PIECE_LEFT":
            return movePieceLeft(state);
        case "MOVE_PIECE_RIGHT":
            return movePieceRight(state);
        case "ROTATE_PIECE_CLOCKWISE":
            return rotatePiece(state, true);
        case "ROTATE_PIECE_COUNTERCLOCKWISE":
            return rotatePiece(state, false);
        default:
            return state;
    }
}

function movePieceDown(state) {
    setToBlack(state.squares);
    if (state.piece.moveDown(state.graveyard)) {
        const pieceType = Math.floor(Math.random() * 7);
        state.piece = new Piece(5, HEIGHT, pieceType);
    } 
    paintGraveyard(state.squares, state.graveyard);
    paintPiece(state.squares, state.piece);
    return {
        ...state
    };
}

function movePieceLeft(state) {
    setToBlack(state.squares);
    state.piece.moveLeft(state.graveyard);
    paintGraveyard(state.squares, state.graveyard);
    paintPiece(state.squares, state.piece);
    return {
        ...state
    };
}

function movePieceRight(state) {
    setToBlack(state.squares);
    state.piece.moveRight(state.graveyard);
    paintGraveyard(state.squares, state.graveyard);
    paintPiece(state.squares, state.piece);
    return {
        ...state
    };
}

function rotatePiece(state, clockwise) {
    setToBlack(state.squares);
    state.piece.rotate(clockwise, state.graveyard);
    paintGraveyard(state.squares, state.graveyard);
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
            const colour = piece.getColour(x, y);
            if (colour !== "") squares[x][y] = colour;
        }
    }
}

function paintGraveyard(squares, graveyard) {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const colour = graveyard.getColour(x, y);
            if (colour !== "") squares[x][y] = colour;
        }
    }
}

export default gameReducer;