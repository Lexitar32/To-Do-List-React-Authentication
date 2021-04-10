import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import TodoList from "./components/TodoList/TodoList";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Switch>
        <Route path="/todo-list" component={TodoList} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
