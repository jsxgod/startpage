import React, { useEffect, useState } from "react";
import {
  BsFillBookmarkPlusFill,
  BsPlusCircleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import availableGroups from "../data/todo-groups";
import { IconButton, Sparkles, Todo, UpdateTodo } from ".";
import { AnimatePresence, motion } from "framer-motion";

const ToDoList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [groupSelectionOpened, setGroupSelectionOpened] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [importantInput, setImportantInput] = useState(false);
  const [selectedInputGroup, setSelectedInputGroup] = useState({});
  const [alertInput, setAlertInput] = useState(false);
  const [alertGroup, setAlertGroup] = useState(false);

  const [groups, setGroups] = useState(availableGroups.bookmarks);
  const [historyGroups, setHistoryGroups] = useState(availableGroups.history);

  const [todos, setTodos] = useState(() => {
    const localTodoData = localStorage.getItem("todos");
    return localTodoData ? JSON.parse(localTodoData) : [];
  });
  const [completedTodos, setCompletedTodos] = useState(() => {
    const localCompletedTodoData = localStorage.getItem("completedTodos");
    return localCompletedTodoData ? JSON.parse(localCompletedTodoData) : [];
  });
  const [removedTodos, setRemovedTodos] = useState(() => {
    const localRemovedTodoData = localStorage.getItem("removedTodos");
    return localRemovedTodoData ? JSON.parse(localRemovedTodoData) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
    localStorage.setItem("removedTodos", JSON.stringify(removedTodos));
  }, [todos, completedTodos, removedTodos]);

  const checkDuplicate = (key) => {
    return todos.filter((t) => t.key === key).length !== 0;
  };
  const checkDuplicateDescription = (description) => {
    return todos.filter((t) => t.description === description).length !== 0;
  };

  const handleAddTodo = async () => {
    const group = selectedInputGroup;
    const todo = {
      key: todoInput.trim(),
      description: todoInput,
      group: group,
      important: importantInput,
      history: "",
      editMode: false,
    };
    if (todo.description !== "") {
      setAlertInput(false);
      if (Object.keys(group).length !== 0) {
        const isDuplicate = await checkDuplicate(todo.key);
        if (!isDuplicate) {
          setTodos((todos) => [...todos, todo]);
          if (!group.selected) {
            handleSelectGroup(group);
          }
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

  const findTodoIndex = (todo) => {
    return todos.findIndex((obj) => obj.key === todo.key);
  };
  const findGroupIndex = (group, groups) => {
    return groups.findIndex((obj) => obj.name === group.name);
  };

  const handleCompleteTodo = (todo) => {
    todo.history = "completed";
    setCompletedTodos((completedTodos) => [...completedTodos, todo]);
    setTodos((todos) => [...todos.filter((t) => t.key !== todo.key)]);
  };

  const handleRemoveTodo = (todo) => {
    todo.history = "removed";
    setRemovedTodos((removedTodos) => [...removedTodos, todo]);
    setTodos((todos) => [...todos.filter((t) => t.key !== todo.key)]);
  };

  const handleRemoveTodoCompletely = (todo) => {
    if (todo.history === "removed") {
      setRemovedTodos((removedTodos) => [
        ...removedTodos.filter((t) => t.key !== todo.key),
      ]);
    } else if (todo.history === "completed") {
      setCompletedTodos((completedTodos) => [
        ...completedTodos.filter((t) => t.key !== todo.key),
      ]);
    }
  };

  const handleBringBackTodo = async (todo, history) => {
    const isDuplicate = await checkDuplicate(todo.key);
    if (!isDuplicate) {
      if (history === "removed") {
        setRemovedTodos((removedTodos) => [
          ...removedTodos.filter((t) => t.key !== todo.key),
        ]);
      } else if (history === "completed") {
        setCompletedTodos((completedTodos) => [
          ...completedTodos.filter((t) => t.key !== todo.key),
        ]);
      }
      setTodos((todos) => [...todos, todo]);
      handleSelectGroup(todo.group);
    } else {
      alert("TODO already exists.");
    }
  };

  const handleSelectGroup = (group) => {
    // reset selection if some group was already selected
    resetSelection(group);
    const idx = findGroupIndex(group, groups);
    groups[idx].selected = !groups[idx].selected;
    selectedGroup.name === group.name
      ? setSelectedGroup({})
      : setSelectedGroup(groups[idx]);
    setGroups((groups) => [...groups]);
    document
      .getElementById("todos-container")
      .scroll({ top: 0, behavior: "smooth" });
  };

  const resetSelection = (group) => {
    if (Object.keys(selectedGroup).length !== 0) {
      if (selectedGroup.name !== group.name) {
        if (
          selectedGroup.name === "completed" ||
          selectedGroup.name === "removed"
        ) {
          const prevIdx = findGroupIndex(selectedGroup, historyGroups);
          historyGroups[prevIdx].selected = !historyGroups[prevIdx].selected;
          setHistoryGroups((historyGroups) => [...historyGroups]);
        } else {
          const prevIdx = findGroupIndex(selectedGroup, groups);
          groups[prevIdx].selected = !groups[prevIdx].selected;
          setGroups((groups) => [...groups]);
        }
      }
    }
  };

  const handleSelectHistoryGroup = (group) => {
    // reset selection if some group was already selected
    resetSelection(group);
    const idx = findGroupIndex(group, historyGroups);
    historyGroups[idx].selected = !historyGroups[idx].selected;
    selectedGroup.name === group.name
      ? setSelectedGroup({})
      : setSelectedGroup(historyGroups[idx]);
    setHistoryGroups((historyGroups) => [...historyGroups]);
  };

  const handleEditTodo = (todo) => {
    const idx = findTodoIndex(todo);
    todos[idx].editMode = true;
    setTodos((todos) => [...todos]);
  };

  const handleUpdateTodo = (todo, updateInput) => {
    if (!checkDuplicateDescription(updateInput)) {
      const idx = findTodoIndex(todo);
      todos[idx].key = updateInput.trim();
      todos[idx].description = updateInput;
      todos[idx].editMode = false;
      setTodos((todos) => [...todos]);
    } else {
      alert("TODO already exists.");
    }
  };

  const handleCancelUpdateTodo = (todo) => {
    const idx = findTodoIndex(todo);
    todos[idx].editMode = false;
    setTodos((todos) => [...todos]);
  };

  const handleChangeImportant = (todo) => {
    const idx = findTodoIndex(todo);
    todos[idx].important = !todos[idx].important;
    setTodos((todos) => [...todos]);
  };

  const InputWrapper = ({ children }) => {
    return todoInput === "" ? children : <Sparkles>{children}</Sparkles>;
  };

  return (
    <div className="todo-list">
      <div className="todo-input-container">
        <div className="todo-input-wrapper">
          <Sparkles hidden={todoInput === ""} minSize={15} maxSize={25}>
            <input
              type="text"
              value={todoInput}
              placeholder={"Type here..."}
              className={`todo-input ${alertInput ? "alert" : ""}`}
              onChange={(event) => {
                setAlertInput(false);
                setTodoInput(event.target.value);
              }}
              autoFocus={true}
            />
          </Sparkles>
        </div>
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
          <AnimatePresence>
            {groupSelectionOpened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, transition: { duration: 0.1 } }}
                className="group-selection-wrapper"
              >
                <div className="group-selection-container">
                  {groups.slice(1).map((g) => (
                    <div
                      key={`${g.name}+-input-option`}
                      className="group-item-wrapper"
                    >
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
              </motion.div>
            )}
          </AnimatePresence>
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
        <div className="groups-sidebar-options-container">
          {groups.map((g) => (
            <div key={g.name} className="groups-sidebar-option-wrapper">
              <div className="groups-sidebar-option">
                <IconButton
                  className="icon"
                  style={{
                    color: g.color,
                    backgroundColor: g.selected ? "#7e54d9" : "inherit",
                  }}
                  onClick={() => handleSelectGroup(g)}
                >
                  {g.icon}
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="groups-sidebar-history-options-container">
          {historyGroups.map((g) => (
            <div key={g.name} className="groups-sidebar-history-option-wrapper">
              <div className="groups-sidebar-history-option">
                <IconButton
                  className="icon"
                  style={{
                    color: g.color,
                    backgroundColor: g.selected ? "#7e54d9" : "inherit",
                  }}
                  onClick={() => handleSelectHistoryGroup(g)}
                >
                  {g.icon}
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="todos-container" id="todos-container">
        {(Object.keys(selectedGroup).length !== 0
          ? selectedGroup.name === "important"
            ? todos.filter((t) => t.important === true)
            : selectedGroup.name === "completed"
            ? completedTodos
            : selectedGroup.name === "removed"
            ? removedTodos
            : todos.filter((t) => t.group.name === selectedGroup.name)
          : todos
        ).map((t, i) =>
          t.editMode ? (
            <UpdateTodo
              key={t.key}
              todo={t}
              handleUpdateTodo={handleUpdateTodo}
              handleCancelUpdateTodo={handleCancelUpdateTodo}
              handleChangeImportant={handleChangeImportant}
            />
          ) : (
            <Todo
              key={t.key}
              todo={t}
              history={t.history}
              handleCompleteTodo={handleCompleteTodo}
              handleRemoveTodo={handleRemoveTodo}
              handleEditTodo={handleEditTodo}
              handleChangeImportant={handleChangeImportant}
              handleRemoveTodoCompletely={handleRemoveTodoCompletely}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ToDoList;
