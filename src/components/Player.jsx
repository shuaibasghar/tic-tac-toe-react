import React, { useState } from "react";

export default function Player({ initialName, symbol }) {
  let [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // setIsEditing(isEditing ? false : true); //
    // setIsEditing(!isEditing); // but this is also not a better way //----> THIS IS SCHEDULING EVENT BUT NOT WORK INSTANT THAT WHY USE FUNCTION

    // alway use functionin setState when you are updating the state based on the previous state
    // because function has current state as a parameter and it will always give you the latest state
    setIsEditing((editing) => !editing);
  }

  //on change will be triggered on every key stroke
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  //   let btnCaption = "Save";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }
  console.log(
    "isEditing",
    isEditing,
    "Player rendered",
    playerName,
    "initialName",
    initialName
  );
  return (
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}