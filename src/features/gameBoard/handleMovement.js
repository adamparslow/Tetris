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

    window.setInterval((e) => {
        frameCounter++;
        if (frameCounter === 10) {
            movePieceDown();
            frameCounter = 0;
        }
    }, 1000/FRAMES_PER_SEC)

    document.onkeydown = (e) => {
        if (!currentKeys[e.keyCode]) {
            currentKeys[e.keyCode] = true;
            switch(e.keyCode) {
                case 37:
                    movePieceLeft();
                    break;
                case 39:
                    movePieceRight();
                    break;
            }
        }
    };

    document.onkeyup = (e) => {
        currentKeys[e.keyCode] = false;
    }

    return gameBoard;
}