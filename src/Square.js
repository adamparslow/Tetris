import React from 'react';

export class Square extends React.Component {
    getColor() {
        const pos = this.props.x * 
    }

    render() {
        return (
            <div className="square" style={{
                height: this.props.size,
                width: this.props.size,
                background: this.getColor()
            }} /> 
        );
    }
}
