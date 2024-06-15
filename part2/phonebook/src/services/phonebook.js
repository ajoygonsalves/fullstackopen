import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

axios
  .get(baseUrl)
  .then((response) => response.data)
  .catch((error) => console.log("Error:", error));

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => console.log("Error:", error));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => console.log("Error:", error));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error:", error);
      throw error; // Re-throw to handle it in the calling function
    });
};

const toDelete = (id) => {
  const request = axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log("Error:", error));
  return request;
};

export default {
  getAll,
  create,
  update,
  toDelete,
};
