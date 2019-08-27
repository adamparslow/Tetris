const initialState = {
    currentPiece: {
        squares: [100],
        colour: "red"
    }
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default gameReducer;