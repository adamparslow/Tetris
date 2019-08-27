import React from 'react';
import './GameBoard.css';
import { Square } from './Square';

export default class GameBoard extends React.Component {
  render() {
    let squares = [];
    for (let y = this.props.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.props.width; x++) {
        squares.push(<Square size="38px" colour="black" x={x} y={y} piece={this.props.piece} />);
      }
    }

    return (
      <div className="gameBoard" style={{
        height: this.props.height * 40,
        width: this.props.width * 40
      }}>
        {squares}
      </div>
    );
  } 
}

