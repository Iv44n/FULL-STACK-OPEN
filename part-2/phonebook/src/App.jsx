import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const initialPersons = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
];

const App = () => {
  const [persons, setPersons] = useState(initialPersons);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [textFilter, setTextFilter] = useState("");

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