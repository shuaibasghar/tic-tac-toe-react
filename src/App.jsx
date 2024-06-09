import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  x: "Player 1",
  O: "Player 2",
};
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function driveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // winner = firstSquareSymbol;
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function driveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivedActivePlayer(gameTurns);

  // let gameBoard = [...initialGameBoard.map((array) => [...array])];

  // for (const turn of gameTurns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;
  //   gameBoard[row][col] = player;
  // }
  // let winner = null;
  // for (const combination of WINNING_COMBINATIONS) {
  //   const firstSquareSymbol =
  //     gameBoard[combination[0].row][combination[0].column];
  //   const secondSquareSymbol =
  //     gameBoard[combination[1].row][combination[1].column];
  //   const thirdSquareSymbol =
  //     gameBoard[combination[2].row][combination[2].column];
  //   if (
  //     firstSquareSymbol &&
  //     firstSquareSymbol === secondSquareSymbol &&
  //     firstSquareSymbol === thirdSquareSymbol
  //   ) {
  //     // winner = firstSquareSymbol;
  //     winner = players[firstSquareSymbol];
  //   }
  // }
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentlyActivePlayer) =>
    //   currentlyActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  //
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.x}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          // turns={gameTurns}
          board={gameBoard}
          onSelectSquare={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
