import http from "./http";

const apiEndpoint = `/tasks`;

export const getTasks = () => {
  return http.get(apiEndpoint);
};

export const createTask = data => {
  return http.post(apiEndpoint, data);
};

export const deleteTask = id => {
  return http.delete(`${apiEndpoint}/${id}`);
};

export const editTask = data => {
  return http.put(`${apiEndpoint}/${data._id}`, data);
};

export default getTasks;
