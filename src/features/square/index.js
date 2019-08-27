import React from 'react';

export class Square extends React.Component {
    render() {
        return (
            <div className="square" style={{
                height: this.props.size,
                width: this.props.size,
                background: this.props.colour
            }}> 
                <p>{this.props.x} {this.props.y}</p>
            </div>
        );
    }
}