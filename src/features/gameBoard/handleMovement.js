import {store} from '../../config/store';
import {FRAMES_PER_SEC} from '../../config/globals';

export default function handleMovement(gameBoard) {

    function movePieceDown() {
        store.dispatch({
            type: "MOVE_PIECE_DOWN"
        })
    }

    window.setInterval((e) => {
        movePieceDown();
    }, 1000/FRAMES_PER_SEC)

    return gameBoard;
}