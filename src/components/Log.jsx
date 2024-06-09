import React from "react";

function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} played at row {turn.square.row}, column{" "}
          {turn.square.col}
        </li>
      ))}
    </ol>
  );
}

export default Log;
