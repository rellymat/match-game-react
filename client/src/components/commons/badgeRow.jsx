import React from 'react';
import Badge from './../badge';


const BadgeRow = ({rows_badges, messageOn, solvePress, handleClick, showCheck, windowWidth}) => {
    return ( rows_badges.map((badge, index) => (
        <div key={index} className="row">
            {badge.map(b => (
                <div key={b.id} className="col">
                    <Badge key={b.id} handleClick={handleClick} badge={b} disabled={messageOn} 
                    windowWidth={windowWidth}/>
                </div>
            ))}
            {solvePress && showCheck(index)}
        </div>
    )) );
}
 
export default BadgeRow;