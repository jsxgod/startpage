import React, { useEffect, useState } from "react";
import {
  BsFillBookmarkPlusFill,
  BsPlusCircleFill,
  BsCheckCircleFill,
  BsTrashFill,
  BsPencilSquare,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdDragHandle } from "react-icons/md";
import availableGroups from "../data/todo-groups";

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
          <button
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
          </button>
          {groupSelectionOpened && (
            <div className="group-selection-wrapper">
              <div className="group-selection-container">
                {groups.slice(1).map((g) => (
                  <div className="group-item-wrapper">
                    <button
                      className={`icon ${
                        selectedInputGroup.name === g.name ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedInputGroup(g);
                        setAlertGroup(false);
                      }}
                    >
                      {g.icon}
                    </button>
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
          <button className="icon add">
            <BsPlusCircleFill />
          </button>
        </div>
        <div
          className="todo-button-wrapper important"
          onClick={() => setImportantInput(!importantInput)}
        >
          <button
            className={`icon ? ${
              importantInput ? "important-button-selected" : "important-button"
            }`}
          >
            <BsExclamationCircleFill />
          </button>
        </div>
      </div>
      <div className="groups-sidebar">
        {groups.map((g) => (
          <div className="group-sidebar-option-wrapper">
            <div className="group-sidebar-option">
              <button
                className="icon"
                style={{ color: g.color }}
                onClick={() => handleSelectGroup(g)}
              >
                {g.icon}
              </button>
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
          <div className="todo-row">
            <div className="todo-description-wrapper">{t.description}</div>
            <div className="todo-actions-container">
              <button className="icon done">
                <BsCheckCircleFill />
              </button>
              <button className="icon remove">
                <BsTrashFill />
              </button>
              <button className="icon edit">
                <BsPencilSquare />
              </button>
              <button className="icon drag">
                <MdDragHandle />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
