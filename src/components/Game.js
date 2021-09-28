import React from "react";
import Board from "./Board";
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastMove = [i % 3, Math.floor(i / 3)];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastMove: lastMove,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      IsEqual: null,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  toggle() {
    this.setState({
      ascend: !this.state.ascend,
    });
  }

  render() {
    const active = {
      fontWeight: "bold",
    };
    const inactive = {
      fontWeight: "normal",
    };
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const toggle = this.state.ascend ? "Ascending" : "Descending";
    const moves = history.map((step, move) => {
      if (this.state.ascend) {
        move = history.length - 1 - move;
      }
      const desc = move
        ? "Go to move #" +
          move +
          " at position (" +
          history[move].lastMove.toString() +
          ")"
        : "Go to game start";
      if (this.state.stepNumber) {
        return (
          <li key={move}>
            <button
              style={this.state.stepNumber === move ? active : inactive}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button
              style={this.state.stepNumber === move ? active : inactive}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      }
    });

    let status;

    if (winner) {
      status = "Winner: " + winner.winner;
    } else if (!current.squares.includes(null)) {
      status = "It's a draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner && winner.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={this.toggle}>{toggle}</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: lines[i],
      };
    }
  }
  return null;
}
