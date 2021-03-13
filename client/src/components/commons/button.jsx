import React from 'react';

const Button = props => {
    const {handleButton, text, style} = props
    return (
            <button type="button" className={style ? style + ' m-2' : 'btn btn-primary m-2' } onClick={() => handleButton()} >{text}</button>
        );
}
 
export default Button;
