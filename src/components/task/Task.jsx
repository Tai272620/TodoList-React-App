import React, { useState } from "react";
import "./task.scss";
import Button from "react-bootstrap/Button";

const Task = ({
  task,
  handleDeleteTask,
  handleEditTask,
  handleCompleteTask,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.complete}
        onChange={() =>
          handleCompleteTask({
            type: "completeTask",
            taskId: task.taskId,
          })
        }
      />
      <p className={`${task.complete ? "complete" : ""}`}>{task.task}</p>
      <Button onClick={() => handleEditTask(task.taskId)}>EDIT</Button>
      <Button
        variant="danger"
        onClick={() =>
          handleDeleteTask({ type: "deleteTask", taskId: task.taskId })
        }
      >
        DELL
      </Button>
    </div>
  );
};

export default Task;
