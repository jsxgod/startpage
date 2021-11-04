import React, { useState } from "react";
import { IconButton } from ".";
import {
  BsPencilSquare,
  BsBackspace,
  BsExclamationCircleFill,
} from "react-icons/bs";

const UpdateTodo = ({
  todo,
  handleUpdateTodo,
  handleCancelUpdateTodo,
  handleChangeImportant,
  alertInput,
}) => {
  const [updateInput, setUpdateInput] = useState(todo.description);
  return (
    <div className="todo-row">
      <div
        className="todo-description-wrapper update"
        style={{
          backgroundColor: "inherit",
          backgroundImage: `linear-gradient(90deg, ${todo.group.color} 50%, transparent 50%),
           linear-gradient(90deg, ${todo.group.color} 50%, transparent 50%), 
           linear-gradient(0deg, ${todo.group.color} 50%, transparent 50%), 
           linear-gradient(0deg, ${todo.group.color} 50%, transparent 50%)`,
          backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
          backgroundSize: "25px 5px, 25px 5px, 5px 25px, 5px 25px",
        }}
      >
        <div className="update-input-wrapper">
          <input
            type="text"
            value={updateInput}
            placeholder={todo.description}
            className={`update-input ${alertInput ? "alert" : ""}`}
            onChange={(event) => setUpdateInput(event.target.value)}
          ></input>
        </div>
      </div>
      <div className="update-actions-container">
        <IconButton
          className="icon cancel"
          onClick={() => handleCancelUpdateTodo(todo, updateInput)}
        >
          <BsBackspace />
        </IconButton>
        <IconButton
          className="icon update"
          onClick={() => handleUpdateTodo(todo, updateInput)}
        >
          <BsPencilSquare />
        </IconButton>
        <IconButton
          className={`icon ? ${
            todo.important ? "important-button-selected" : "important-button"
          }`}
          onClick={() => handleChangeImportant(todo)}
        >
          <BsExclamationCircleFill />
        </IconButton>
      </div>
    </div>
  );
};

export default UpdateTodo;
