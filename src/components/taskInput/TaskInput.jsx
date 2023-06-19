import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./taskInput.scss";

function TaskInput({ handleAddTask, isEdit, handleUpdateTask }) {
  const [task, setTask] = useState("");
  //   const [showAddButton, setShowAddButton] = useState(true);

  useEffect(() => {
    if (isEdit) {
      setTask(isEdit.task);
      //   setShowAddButton(false);
    } else {
      setTask("");
      //   setShowAddButton(true);
    }
  }, [isEdit]);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  return (
    <>
      <Form>
        <Form.Group
          className="mb-3 form-group"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="label">Mini Project</Form.Label>
          <Form.Control
            type="text"
            placeholder="New Task"
            className="input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {!isEdit ? (
            <button
              className="addButton"
              onClick={() => {
                if (task !== "") {
                  handleAddTask({
                    type: "addTask",
                    newTask: {
                      taskId: uuidv4(),
                      task,
                      complete: false,
                    },
                  });
                  setTask("");
                } else {
                  alert("Please enter your Task!");
                }
              }}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          ) : (
            <button
              className="addButton"
              onClick={() => {
                handleUpdateTask({
                  type: "updateTask",
                  taskUpdate: {
                    taskId: isEdit.taskId,
                    task,
                    complete: isEdit.complete,
                  },
                });
                setTask("");
              }}
            >
              Save
            </button>
          )}
        </Form.Group>
      </Form>
    </>
  );
}

export default TaskInput;
