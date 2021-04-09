import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
    if (!localStorage.getItem("List")) localStorage.setItem("List", []);
    const list = localStorage.getItem("List");
    const parsedList = list.length > 0 ? JSON.parse(list) : list;
    setList(parsedList);
  }, []);

  const addTask = () => {
    if (!input) return toast.error("Please fill input!");

    const task = {
      id: Date.now(),
      name: document.getElementById("taskInput").value,
    };
    const newList = [...list];
    newList.push(task);
    localStorage.setItem("List", JSON.stringify(newList));
    setList(newList);

    setInput("");
  };

  const deleteTask = task => {
    const newList = list.filter(item => item !== task);
    localStorage.setItem("List", JSON.stringify(newList));
    setList(newList);
  };

  const editTask = task => {
    setInput(task.name);
    setEdit(task);
  };

  const saveTask = () => {
    const newList = [...list];
    const index = list.findIndex(task => task.id === edit.id);
    newList[index].name = input;
    localStorage.setItem("List", JSON.stringify(newList));
    setList(newList);
    setInput("");
    setEdit({});
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
                  <ListItem className="list-group-item" key={item.id}>
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
