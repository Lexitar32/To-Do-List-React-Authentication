import React from "react";
import { ToastContainer } from "react-toastify";
import TodoList from "./components/TodoList";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <TodoList />
    </React.Fragment>
  );
}

export default App;
