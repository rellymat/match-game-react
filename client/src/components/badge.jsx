import React, { Component } from 'react';

class Badge extends Component {
    render() {
        const { handleClick, badge, disabled, windowWidth } = this.props
        const size = windowWidth > 768 ? "20px" : "13px"
        const textStyle = {
            fontSize: size,
            flex: 1,
            textAlign: 'center',
            color: 'rgb(224,255,255)',
            fontFamily: 'notoserif',
            textShadow: '-1px 1px 10px rgba(0, 0, 0, 0.75)'
        };

        let classes = this.getClass(badge);
        let text = badge.text 
        return <div className={classes} style={badge.change && !disabled ? { cursor: 'pointer' } : {}}
            onClick={!disabled ? () => handleClick(badge) : () => this.doNothing()} ><p style={text === 'null' ? {opacity: 0} : textStyle} className="m-2"
             >{text}</p></div>
    }

    doNothing = () => {
    }
    
    getClass = badge => {
        let classes = "badge badge-pill m-2 " + badge.color
        if (badge.selected)
            classes += " selected"
        return classes
    }

    handleText = text => {
        let newText = text
        if (text.length > 22) {
            let indexSpace = text.indexOf(' ')
            while (text.indexOf(' ', indexSpace + 1) !== -1 && text.indexOf(' ', indexSpace + 1) < 22) {
                indexSpace = text.indexOf(' ', indexSpace + 1)
            }
       //     newText = text.substring(0, indexSpace) + '\n' + text.substring(indexSpace + 1)
        }


        return newText;
    }

}


export default Badge;