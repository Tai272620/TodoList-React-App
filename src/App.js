
import React, { useReducer, useState } from 'react';
import ListTasks from './components/listTasks/ListTasks';
import TaskInput from './components/taskInput/TaskInput';

function App() {
  const initState = JSON.parse(localStorage.getItem("listTasks")) || [];

  const [isEdit, setIsEdit] = useState(null);

  const handleEditTask = (id) => {
    const taskToEdit = initState.find((task) => task.taskId === id);
    setIsEdit(taskToEdit);
  };

  function reducerTask(state, action) {
    switch (action.type) {
      case "addTask":
        localStorage.setItem("listTasks", JSON.stringify([...state, action.newTask]));
        return [...state, action.newTask];

      case "deleteTask":
        const updatedState = state.filter(
          (task) => task.taskId !== action.taskId
        );
        localStorage.setItem("listTasks", JSON.stringify(updatedState));
        return updatedState;

      case "updateTask":
        const updatedTasks = state.map((task) => {
          if (task.taskId === action.taskUpdate.taskId) {
            return action.taskUpdate;
          }
          return task;
        })
        localStorage.setItem("listTasks", JSON.stringify(updatedTasks));
        return updatedTasks;

      case "completeTask":
        const completedTasks = state.map((task) => {
          if (task.taskId === action.taskId) {
            return { ...task, complete: !task.complete }
          } else {
            return task;
          }
        })
        localStorage.setItem("listTasks", JSON.stringify(completedTasks));
        return completedTasks;

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducerTask, initState);
  return (
    <div>
      <TaskInput handleAddTask={dispatch} listTasks={state} isEdit={isEdit} handleUpdateTask={dispatch} />
      <ListTasks listTasks={state} handleDeleteTask={dispatch} handleCompleteTask={dispatch} handleEditTask={handleEditTask} />
    </div>
  );
}

export default App;
