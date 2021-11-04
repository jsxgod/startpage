import { IconButton } from ".";

import {
  BsCheckCircleFill,
  BsFillXCircleFill,
  BsTrashFill,
  BsPencilSquare,
  BsExclamationCircleFill,
} from "react-icons/bs";

const Todo = ({
  todo,
  handleChangeImportant,
  handleCompleteTodo,
  handleRemoveTodo,
  handleRemoveTodoCompletely,
  handleEditTodo,
  history,
}) => {
  return (
    <div className="todo-row">
      <div
        className="todo-description-wrapper"
        style={{
          outline: history
            ? history === "completed"
              ? "5px solid #00c853"
              : "5px solid #cf291d"
            : `4px solid ${todo.group.color}`,
        }}
      >
        {todo.description}
      </div>
      {!history && (
        <div className="todo-actions-container">
          <IconButton
            className="icon done"
            onClick={() => handleCompleteTodo(todo)}
          >
            <BsCheckCircleFill />
          </IconButton>
          <IconButton
            className="icon remove"
            onClick={() => handleRemoveTodo(todo)}
          >
            <BsFillXCircleFill />
          </IconButton>
          <IconButton
            className="icon edit"
            onClick={() => handleEditTodo(todo)}
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
      )}
      {history && (
        <div className="history-todo-actions-container">
          <IconButton
            className="icon remove"
            onClick={() => handleRemoveTodoCompletely(todo)}
          >
            <BsTrashFill />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Todo;
