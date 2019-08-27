import React from 'react';
import { Square } from '../square';
import { connect } from 'react-redux';

class GameBoard extends React.Component {
    getColour(x, y) {
        const pos = y * this.props.width + x;
        let colour = "black";
        this.props.squares.forEach((squarePos) => {
            if (squarePos === pos) {
                colour = this.props.colour;
            }
        });
        console.log(colour);
        return colour;
    }

  render() {
    let squares = [];
    for (let y = this.props.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.props.width; x++) {
        squares.push(<Square size="38px" colour={this.getColour(x, y)} />);
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

function mapStateToProps(state) {
    return {
        ...state.game.currentPiece
    }
}

export default connect(mapStateToProps)(GameBoard)