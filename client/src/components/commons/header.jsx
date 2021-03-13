import React from 'react';

const Header = ({title, windowWidth}) => {
    const style = {
        textAlign: "center"
    }
    if(windowWidth > 768)
        return (<h1 style={style}>{title}</h1>);
    return (<h4 style={style}>{title}</h4>)
}
 
export default Header;