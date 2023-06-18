import React, { useState } from "react";
import "./header.scss";

const Header = ({ handleAddTodo }) => {
  const [todo, setTodo] = useState("");
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  return (
    <div className="headerContainer">
      <h1>To Do List App</h1>
      <input
        type="text"
        placeholder="New Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="addButton"
        onClick={() => {
          if (todo !== "") {
            handleAddTodo({
              type: "addTodo",
              newTodo: {
                todoId: uuidv4(),
                todo,
                complete: false,
              },
            });
            setTodo("");
          } else {
            alert("Please enter todo!");
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Header;
