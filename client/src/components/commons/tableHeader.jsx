import React, { Component } from "react";
import Button from './button';


class TableHeader extends Component {
  
  render() {
    const { input, buttons, index, handleButton, windowWidth, flag} = this.props
    const size = windowWidth > 768 ? "" : " btn-sm"
    const background = windowWidth < 768 && flag ? {'background': 'white'} : {}
    return (
      <thead  style={background}>
        <tr>
          <th key={index}>
              <h5>{input}</h5>
            </th>
            {buttons.map(b => (
              <th key={b.name + index}>
                <button type="button" className={b.style + size} onClick={() => handleButton(input, b.name)}  >{b.name}</button>
              </th>
            ))}
        </tr>
        </thead>
    );
  }
}

export default TableHeader;
