import axios from "axios";

const baseUrl = import.meta.env.VITE_API_ENDPOINT || "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.log("Error fetching persons:", error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.log("Error creating person:", error);
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(`Error updating person with id ${id}:`, error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error(`Error deleting person with id ${id}:`, error);
    throw error;
  }
};

export default { getAll, create, update, remove };
