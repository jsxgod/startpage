import React, { useEffect, useState } from "react";
import {
  BsFillBookmarkPlusFill,
  BsPlusCircleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import availableGroups from "../data/todo-groups";
import { IconButton, Todo } from ".";

const ToDoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [groupSelectionOpened, setGroupSelectionOpened] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [importantInput, setImportantInput] = useState(false);
  const [selectedInputGroup, setSelectedInputGroup] = useState({});
  const [alertInput, setAlertInput] = useState(false);
  const [alertGroup, setAlertGroup] = useState(false);

  const groups = availableGroups;
  const [todos, setTodos] = useState([]);

  const checkDuplicate = (passedTodos, todo) => {
    return (
      passedTodos.filter((t) => t.description === todo.description).length !== 0
    );
  };

  const handleAddTodo = async () => {
    const group = selectedInputGroup;
    const todo = {
      key: todoInput.trim(),
      description: todoInput.trim(),
      group: group,
      important: importantInput,
    };
    if (todo.description !== "") {
      setAlertInput(false);
      if (Object.keys(group).length !== 0) {
        const isDuplicate = await checkDuplicate(todos, todo);
        if (!isDuplicate) {
          setTodos((todos) => [...todos, todo]);
          setSelectedGroup(group);
          setSelectedInputGroup({});
          setTodoInput("");
          setGroupSelectionOpened(false);
          setImportantInput(false);
        } else {
          alert("TODO already exists.");
        }
      } else {
        setAlertGroup(true);
      }
    } else {
      setAlertInput(true);
    }
  };

  const handleSelectGroup = (group) => {
    selectedGroup.name === group.name
      ? setSelectedGroup({})
      : setSelectedGroup(group);
  };

  return (
    <div className="todo-list">
      <div className="todo-input-wrapper">
        <input
          type="text"
          value={todoInput}
          placeholder={"Type here..."}
          className={`todo-input ${alertInput ? "alert" : ""}`}
          onChange={(event) => setTodoInput(event.target.value)}
        ></input>
        <div className="todo-button-wrapper select-group">
          <IconButton
            className={`icon ${
              alertGroup ? "group-select-alert" : "group-select"
            }`}
            onClick={() => setGroupSelectionOpened(true)}
          >
            {Object.keys(selectedInputGroup).length !== 0 ? (
              selectedInputGroup.icon
            ) : (
              <BsFillBookmarkPlusFill />
            )}
          </IconButton>
          {groupSelectionOpened && (
            <div className="group-selection-wrapper">
              <div className="group-selection-container">
                {groups.slice(1).map((g) => (
                  <div className="group-item-wrapper">
                    <IconButton
                      className={`icon ${
                        selectedInputGroup.name === g.name ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedInputGroup(g);
                        setAlertGroup(false);
                      }}
                    >
                      {g.icon}
                    </IconButton>
                  </div>
                ))}
                <button
                  className="group-selection-close-button"
                  onClick={() => {
                    setGroupSelectionOpened(false);
                  }}
                >
                  <RiCloseCircleFill />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="todo-button-wrapper add" onClick={handleAddTodo}>
          <IconButton className="icon add">
            <BsPlusCircleFill />
          </IconButton>
        </div>
        <div
          className="todo-button-wrapper important"
          onClick={() => setImportantInput(!importantInput)}
        >
          <IconButton
            className={`icon ? ${
              importantInput ? "important-button-selected" : "important-button"
            }`}
          >
            <BsExclamationCircleFill />
          </IconButton>
        </div>
      </div>
      <div className="groups-sidebar">
        {groups.map((g) => (
          <div className="group-sidebar-option-wrapper">
            <div className="group-sidebar-option">
              <IconButton
                className="icon"
                style={{ color: g.color }}
                onClick={() => handleSelectGroup(g)}
              >
                {g.icon}
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div className="todos-container">
        {(Object.keys(selectedGroup).length !== 0
          ? selectedGroup.name === "important"
            ? todos.filter((t) => t.important === true)
            : todos.filter((t) => t.group.name === selectedGroup.name)
          : todos
        ).map((t, i) => (
          <Todo data={t} />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
