import React, { useState } from "react";
import "./content.scss";

const Content = ({
  listTodo,
  handleDeleteTodo,
  handleUpdateTodo,
  handleCompleteTodo,
}) => {
  const [todo, setTodo] = useState(null);
  const [todoId, setTodoId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <table style={{ listStyle: "none" }}>
      <tbody>
        {listTodo.map((item, index) =>
          !isEdit ? (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={item.complete}
                  onChange={() =>
                    handleCompleteTodo({
                      type: "completeTodo",
                      todoId: item.todoId,
                    })
                  }
                />
              </td>
              <td className={`${item.complete ? "complete" : ""}`}>
                {item.todo}
              </td>
              <td>
                <button
                  onClick={() =>
                    handleDeleteTodo({
                      type: "deleteTodo",
                      todoId: item.todoId,
                    })
                  }
                >
                  delete
                </button>
              </td>
              <td className={`${item.complete ? "disable" : ""}`}>
                <button
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setTodo(item.todo);
                    setTodoId(item.todoId);
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          ) : todoId === item.todoId ? (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    handleUpdateTodo({
                      type: "updateTodo",
                      todoUpdate: {
                        todoId,
                        todo,
                      },
                    });
                    setIsEdit(!isEdit);
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
          ) : (
            <tr key={index}>
              <td>
                <input type="checkbox" />{" "}
              </td>
              <td>{item.todo}</td>
              <td>
                <button
                  onClick={() =>
                    handleDeleteTodo({
                      type: "deleteTodo",
                      todoId: item.todoId,
                    })
                  }
                >
                  delete
                </button>
              </td>
              <td className={`${item.complete ? "disable" : ""}`}>
                <button
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setTodo(item.todo);
                    setTodoId(item.todoId);
                  }}
                >
                  edit
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Content;
