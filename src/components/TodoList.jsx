import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as taskService from "../services/tasks";
import {
  Body,
  Container,
  Wrapper,
  Title,
  ListBody,
  ListItem,
  Button,
} from "./TodoListStyles";

function TodoList(props) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await taskService.getTasks();
        setList(data);
      } catch (error) {
        if (error.response) toast.error(error.response.data);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input) return toast.error("Please fill input!");

    const task = {
      name: document.getElementById("taskInput").value,
    };

    try {
      const { data } = await taskService.createTask(task);
      delete data.__v;
      const newList = [...list, data];
      setList(newList);
      setInput("");
      toast.success("Task added successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
    }
  };

  const deleteTask = async task => {
    const originalList = [...list];
    const newList = list.filter(item => item._id !== task._id);
    setList(newList);
    try {
      await taskService.deleteTask(task._id);
      toast.warning("Task deleted successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      setList(originalList);
    }
  };

  const editTask = task => {
    document.getElementById("taskInput").focus();
    setInput(task.name);
    setEdit(task);
  };

  const saveTask = async () => {
    const originalList = [...list];
    const editedInput = { _id: edit._id, name: input };
    const newList = list.map(task =>
      task._id === edit._id ? editedInput : task
    );

    setList(newList);
    setInput("");
    setEdit({});

    try {
      await taskService.editTask(editedInput);
      toast.success("Task edited successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      setList(originalList);
    }
  };

  const handleInput = ({ currentTarget }) => {
    const input = currentTarget.value;
    setInput(input);
  };

  const cancelEdit = () => {
    setInput("");
    setEdit({});
  };

  return (
    <Body>
      <Container>
        <Wrapper>
          <Title>TODO LIST</Title>
          <ListBody>
            <div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Task"
                  id="taskInput"
                  onChange={handleInput}
                  value={input}
                ></input>
                {_.isEmpty(edit) && (
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => addTask()}
                    >
                      New Task
                    </button>
                  </div>
                )}
                {!_.isEmpty(edit) && (
                  <React.Fragment>
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => saveTask(list)}
                      >
                        Save
                      </button>
                    </div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            <ul className="list-group">
              {list &&
                list.map(item => (
                  <ListItem className="list-group-item" key={item._id}>
                    {item.name}
                    <div>
                      <Button onClick={() => editTask(item)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Button>
                      <Button delete onClick={() => deleteTask(item)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </Button>
                    </div>
                  </ListItem>
                ))}
            </ul>
          </ListBody>
        </Wrapper>
      </Container>
    </Body>
  );
}

export default TodoList;
