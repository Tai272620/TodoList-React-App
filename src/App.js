
import React, { useReducer } from 'react';
import Content from './components/content/Content';
import Header from './components/header/Header';

function App() {
  const initState = JSON.parse(localStorage.getItem("listTodos")) || [];

  function reducerTodo(state, action) {
    switch (action.type) {
      case "addTodo":
        localStorage.setItem("listTodos", JSON.stringify([...state, action.newTodo]));
        return [...state, action.newTodo];

      case "deleteTodo":
        const updatedState = state.filter(
          (todo) => todo.todoId !== action.todoId
        );
        localStorage.setItem("listTodos", JSON.stringify(updatedState));
        return updatedState;

      case "updateTodo":
        const updatedTodos = state.map((todo) => {
          if (todo.todoId === action.todoUpdate.todoId) {
            return action.todoUpdate;
          }
          return todo;
        })
        localStorage.setItem("listTodos", JSON.stringify(updatedTodos));
        return updatedTodos;

      case "completeTodo":
        const completedTodos = state.map((todo) => {
          if (todo.todoId === action.todoId) {
            return { ...todo, complete: !todo.complete }
          } else {
            return todo;
          }
        })
        localStorage.setItem("listTodos", JSON.stringify(completedTodos));
        return completedTodos;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducerTodo, initState);
  return (
    <div>
      <Header handleAddTodo={dispatch} />
      <Content listTodo={state} handleDeleteTodo={dispatch} handleUpdateTodo={dispatch} handleCompleteTodo={dispatch} />
    </div>
  );
}

export default App;
