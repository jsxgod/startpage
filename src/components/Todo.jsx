import React, { useState } from "react";
import { IconButton } from ".";

import {
  BsCheckCircleFill,
  BsTrashFill,
  BsPencilSquare,
  BsExclamationCircleFill,
} from "react-icons/bs";

const Todo = ({ data }) => {
  const [description, setDescription] = useState(data.description);
  const [important, setImportant] = useState(data.important);

  return (
    <div className="todo-row">
      <div className="todo-description-wrapper">{description}</div>
      <div className="todo-actions-container">
        <IconButton className="icon done">
          <BsCheckCircleFill />
        </IconButton>
        <IconButton className="icon remove">
          <BsTrashFill />
        </IconButton>
        <IconButton className="icon edit">
          <BsPencilSquare />
        </IconButton>
        <IconButton
          className={`icon ? ${
            important ? "important-button-selected" : "important-button"
          }`}
          onClick={() => setImportant(!important)}
        >
          <BsExclamationCircleFill />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
