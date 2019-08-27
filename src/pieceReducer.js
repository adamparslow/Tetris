export const pieceReducer = (state = 0, action) => {
    switch (action.type) {
        case "MOVE_PIECE_DOWN":
            return state + 1;
    }
}