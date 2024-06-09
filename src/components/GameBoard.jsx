import { useState } from "react";

// Define the initial state of the game board as a 3x3 grid filled with null values
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Define the GameBoard component
export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {});
  }
  return (
    // Render an ordered list with the id "game-board"
    <ol id="game-board">
      {/* Map over each row in the game board */}
      {initialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* Map over each square in the row */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
