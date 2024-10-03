import { useState } from "react";
import Square from "./Square";

const Table = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  let status;
  switch (winner) {
    case "X" || "O":
      status = `Winner ${winner}`;
      break;
    case "Tie":
      status = `It's a tie!`;
      break;
    default:
      status = `Next player: ${isXNext ? "X" : "O"}`;
      break;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="btn btn-primary restart" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

const calculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2], //rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.join("").length === 9) {
    return "Tie";
  }
  return null;
};

export default Table;
