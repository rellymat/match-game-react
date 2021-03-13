import React, { Component } from 'react';
import Button from './common/button';

class Message extends Component {
    render() {
        const { handleButton, message, buttons } = this.props
        return (<div className="message">
            <h1>{message}</h1>
            {buttons.map((b, index) => (
                <Button key={index} text={b.name} handleButton={() => handleButton(b.name)} />
            ))}
        </div>);
    }
}

export default Message;