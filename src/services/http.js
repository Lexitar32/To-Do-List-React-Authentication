import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.baseURL = "https://todo-list-ekesolonge.herokuapp.com/api";

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
