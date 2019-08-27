import React from 'react';
import './GameBoard.css';
import { Square } from './Square';
import { connect } from 'react-redux';

class GameBoard extends React.Component {
  render() {
    let squares = [];
    for (let i = 0; i < this.props.height * this.props.width; i++) {
      let colour = "black";
      if (i/this.props.width === this.props.x) colour = "red";
      squares.push(<Square size="38px" colour={colour} z/>);
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
    x: state
  }
}

export default connect(mapStateToProps)(GameBoard)
