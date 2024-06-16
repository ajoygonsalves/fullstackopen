import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    console.log({ response });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log("Validation Error:", error.response.data.error);
    } else {
      console.log("Unexpected Error:", error.message);
    }
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log("Validation Error:", error.response.data.error);
    } else {
      console.log("Unexpected Error:", error.message);
    }
    throw error;
  }
};

const toDelete = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log("Validation Error:", error.response.data.error);
    } else {
      console.log("Unexpected Error:", error.message);
    }
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.log("Validation Error:", error.response.data.error);
    } else {
      console.log("Unexpected Error:", error.message);
    }
    throw error;
  }
};

export default {
  getAll,
  create,
  update,
  toDelete,
};
