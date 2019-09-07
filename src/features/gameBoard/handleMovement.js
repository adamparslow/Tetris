import {store} from '../../config/store';
import {FRAMES_PER_SEC} from '../../config/globals';

export default function handleMovement(gameBoard) {

    let frameCounter = 0

    let currentKeys = {};

    function movePieceDown() {
        store.dispatch({
            type: "MOVE_PIECE_DOWN"
        });
    }

    function movePieceLeft() {
        store.dispatch({
            type: "MOVE_PIECE_LEFT"
        });
    }
    
    function movePieceRight() {
        store.dispatch({
            type: "MOVE_PIECE_RIGHT"
        });
    }

    function rotatePiece(clockwise) {
        if (clockwise) {
            store.dispatch({
                type: "ROTATE_PIECE_CLOCKWISE"
            });
        } else {
            store.dispatch({
                type: "ROTATE_PIECE_COUNTERCLOCKWISE"
            });
        }
    }

    function movePieceToBottom() {
        store.dispatch({
            type: "MOVE_PIECE_TO_BOTTOM"
        });
    }

    window.setInterval((e) => {
        if (currentKeys[40]) {
            movePieceDown();
        }
        frameCounter++;
        if (frameCounter === 10) {
            movePieceDown();
            frameCounter = 0;
        }
    }, 1000/FRAMES_PER_SEC)

    document.onkeydown = (e) => {
        console.log(e.keyCode);
        if (!currentKeys[e.keyCode]) {
            currentKeys[e.keyCode] = true;
            switch(e.keyCode) {
                case 37:
                    movePieceLeft();
                    break;
                case 39:
                    movePieceRight();
                    break;
                case 88:
                case 38:
                    rotatePiece(true);
                    break;
                case 90:
                    rotatePiece(false);
                    break;
                case 32:
                    movePieceToBottom();
                    break;
                default:
                    break;
            }
        }
    };

    document.onkeyup = (e) => {
        currentKeys[e.keyCode] = false;
    }

    return gameBoard;
}