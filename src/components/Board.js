import React from "react";
import Square from "./Square";
const BOARD_SIZE = 3;
export default class Board extends React.Component {
  renderSquare(i) {
    let winningSquare =
      this.props.winner && this.props.winner.includes(i) ? true : false;
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winningSquare={winningSquare}
      />
    );
  }

  render() {
    const boardSquares = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      let boardRow = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        boardRow.push(
          <span key={row * BOARD_SIZE + col}>
            {this.renderSquare(row * BOARD_SIZE + col)}
          </span>
        );
      }
      boardSquares.push(
        <div className="board-row" key={row}>
          {boardRow}
        </div>
      );
    }
    return <div>{boardSquares}</div>;
  }
}
