import React, {createContext} from 'react';
import Piece from './Piece';

export const GameContext = createContext();

export class GameProvider extends React.Component {
    constructor() {
        super()
        const piece = new Piece(5, 5, 10, 0);
        this.state = {
            piece
        }
        this.moveDown = this.moveDown.bind(this);

        const FRAMES_PER_SEC = 3;
        window.setInterval(() => {
            this.moveDown()
            console.log(this.state.piece.blocks);
        }, 1000/FRAMES_PER_SEC);
    }

    moveDown() {
        this.setState((state, props) => {
            state.piece.moveDown()
            return {
                piece: state.piece
            };
        });
    }

    render() {
        return(
            <GameContext.Provider value={this.state.piece}>
                {this.props.children}
            </GameContext.Provider>
        )
    }
}