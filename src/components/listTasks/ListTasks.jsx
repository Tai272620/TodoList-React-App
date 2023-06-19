import React, { useState } from "react";
import Task from "../task/Task";
import "./listTasks.scss";

const ListTasks = ({
  listTasks,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}) => {
  return (
    <div className="listTasks-container">
      <p>You have {listTasks.length} tasks to complete</p>
      {listTasks.map((task, index) => (
        <Task
          task={task}
          key={index}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleCompleteTask={handleCompleteTask}
        />
      ))}
    </div>
  );
};

export default ListTasks;
