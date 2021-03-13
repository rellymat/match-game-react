import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (game, item, index) => {
    return (
    <tr key={index}>
      <td key={game[item][0]} style={{width: '50%'}}>
      {game[item][0]}
      </td>
      <td key={game[item][1]} style={{width: '50%'}}>
      {game[item][1]}
      </td>
      <td></td>
    </tr>
    )
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { game } = this.props;

    return (
      <tbody>
        {this.renderCell(game, "items_1", 1)}
        {this.renderCell(game, "items_2", 2)}
        {this.renderCell(game, "items_3", 3)}
        {this.renderCell(game, "items_4", 4)}

      </tbody>
    );
  }
}

export default TableBody;
