import React from 'react';
import Square from '../square';
import handleMovement from './handleMovement';
import { connect } from 'react-redux';
import { HEIGHT, WIDTH, SQUARE_SIZE } from '../../config/globals';

class GameBoard extends React.Component {
    getColour(x, y) {
        // const pos = y * WIDTH + x;
        // let colour = "black";
        // this.props.squares.forEach((squarePos) => {
        //     if (squarePos === pos) {
        //         colour = this.props.colour;
        //     }
        // });
        // return this.props.squares[x][y];
    }

    render() {
        let squares = [];
        for (let y = HEIGHT - 1; y >= 0; y--) {
            for (let x = 0; x < WIDTH; x++) {
                squares.push(<Square key={y * WIDTH + x} x={x} y={y}/>);
            }
        }

        return (
            <div className="gameBoard" style={{
                height: HEIGHT * SQUARE_SIZE,
                width: WIDTH * SQUARE_SIZE
            }}>
                {squares}
            </div>
        );
    } 
}

function mapStateToProps(state) {
    return {
        ...state.game
    }
}

export default connect(mapStateToProps)(handleMovement(GameBoard))