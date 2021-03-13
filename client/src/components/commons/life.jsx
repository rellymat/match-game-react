import React from 'react';

const Life = props => {
    switch (props.lives) {
        case 1:
            return (<p className="life">&#10084;</p>);
        case 2:
            return (<p className="life">&#10084; &#10084;</p>);
        case 3:
            return (<p className="life">&#10084; &#10084; &#10084;</p>);
        default:
            return (<p />);
    }
}


export default Life;