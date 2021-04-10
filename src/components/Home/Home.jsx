import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Body,
  Container,
  Wrapper,
  Title,
  PrimaryButton,
  Error,
  ErrorMessage,
} from "./HomeStyles";
import http from "./../../services/http";

function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = ({ currentTarget: input }) => setUsername(input.value);
  const handlePassword = ({ currentTarget: input }) => setPassword(input.value);

  const register = async e => {
    e.preventDefault();
    const user = { username, password };
    try {
      const { headers } = await http.post("/users", user);
      localStorage.setItem("token", headers["x-auth-token"]);
      window.location = "/todo-list";
    } catch (error) {
      if (error.response) setError(error.response.data);
    }
  };

  return (
    <Body>
      <Container>
        <Wrapper>
          <Title>Create a New Account</Title>
          <form onSubmit={register}>
            <div className="d-flex align-content-center justify-content-end">
              <small className="m-0">
                Already have an account?
                <Link to="/login"> Sign In</Link>
              </small>
            </div>
            {error && (
              <Error>
                <ErrorMessage className="m-0">{error}</ErrorMessage>
              </Error>
            )}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsername}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember Me
              </label>
            </div>
            <PrimaryButton type="submit" className="btn btn-primary">
              Sign Up
            </PrimaryButton>
          </form>
        </Wrapper>
      </Container>
    </Body>
  );
}

export default Home;
