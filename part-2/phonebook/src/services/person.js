import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(BASE_URL);
  return req.then((res) => res.data);
};

const addPerson = (newPerson) => {
  const req = axios.post(BASE_URL, newPerson);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${BASE_URL}/${id}`);
  return req.then((res) => res.data);
};

export default {
  getAll,
  addPerson,
  deletePerson,
};