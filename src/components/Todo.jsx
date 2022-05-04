import { IconButton } from ".";

import {
  BsCheckCircleFill,
  BsFillXCircleFill,
  BsTrashFill,
  BsPencilSquare,
  BsExclamationCircleFill,
  BsArrowCounterclockwise,
} from "react-icons/bs";

const Todo = ({
  as,
  enableDrag,
  todo,
  handleChangeImportant,
  handleCompleteTodo,
  handleRemoveTodo,
  handleRemoveTodoCompletely,
  handleBringBackTodo,
  handleEditTodo,
  history,
}) => {
  const theme = JSON.parse(localStorage.getItem("theme"));
  const Component = as || "div";
  return (
    <Component className="todo-row" value={todo} dragListener={enableDrag}>
      <div
        className={`todo-description-wrapper ${
          theme ? (theme.mono === "true" ? "mono" : "") : ""
        } ${enableDrag ? "grab" : ""}`}
        style={{
          border: theme
            ? theme.mono === "true"
              ? ""
              : `4px solid ${todo.group.color}`
            : `4px solid ${todo.group.color}`,
          borderBottom: history
            ? history === "completed"
              ? "4px solid #00c853"
              : "4px solid #cf291d"
            : `4px solid ${todo.group.color}`,
        }}
      >
        <p>{todo.description}</p>
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
          <IconButton
            className="icon back-arrow"
            onClick={() =>
              handleBringBackTodo({ ...todo, history: "" }, todo.history)
            }
          >
            <BsArrowCounterclockwise />
          </IconButton>
        </div>
      )}
    </Component>
  );
};

export default Todo;
