import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => newPerson.name.toUpperCase() === person.name.toUpperCase())) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({
        name: "",
        number: "",
      });
      return;
    }

    const newPersonObject = {
      ...newPerson,
      id: persons.length + 1
    }

    setPersons([newPersonObject, ...persons]);
    setNewPerson({ name: "", number: "", });
  };

  const handleChangeName = (e) => {
    setNewPerson({
      ...newPerson,
      name: e.target.value,
    });
  };

  const handleChangeNumber = (e) => {
    setNewPerson({
      ...newPerson,
      number: e.target.value,
    });
  };

  const filterPerson = (e) => {
    const { value } = e.target
    setTextFilter(value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filterPerson={filterPerson} textFilter={textFilter} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newPerson={newPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} textFilter={textFilter} />
    </>
  );
};

export default App;