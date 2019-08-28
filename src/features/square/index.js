import React from 'react';
import { SQUARE_SIZE } from '../../config/globals';
import { connect } from 'react-redux';

class Square extends React.Component {
    render() {
        return (
            <div className="square" style={{
                height: SQUARE_SIZE - 2,
                width: SQUARE_SIZE - 2,
                background: this.props.colour
            }} /> 
        );
    }
}

function mapStateToProps(state, props) {
    return {
        colour: state.game.squares[props.x][props.y]
    }
}

export default connect(mapStateToProps)(Square);