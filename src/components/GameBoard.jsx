import { useState } from "react";

// Define the initial state of the game board as a 3x3 grid filled with null values
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
/**
 important note
 
 UPdate the object-state immutably

 Object and array (which are technically are objects) are reference values in JavaScript

 You should therefore not mutate them directly-- instead create a deep copy first and then update the copy


 // lifting state up

 Lift the state up to the closest ancestor component that has access to all components that need to work with that state
-- in this case the app-component is the closest ancestor component that has access to both the Player and GameBoard components
 */

// Define the GameBoard component
export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    // console.log(rowIndex, colIndex);
    setGameBoard((prevGameBoard) => {
      // prevGameBoard[rowIndex][colIndex] = "X"; // this is mutating the state directly not a good practice
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      console.log(updatedBoard);
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

      return updatedBoard;
    });
    onSelectSquare();
  }
  return (
    // Render an ordered list with the id "game-board"
    <ol id="game-board">
      {/* Map over each row in the game board */}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* Map over each square in the row */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
