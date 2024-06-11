import axios from "axios";

const baseUrl =
  "https://fullstackopen-phonebook-backend-aj.fly.dev/api/persons";

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
    .catch((error) => console.log("Error:", error));
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
