import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find(
      (person) => newPerson.name.toUpperCase() === person.name.toUpperCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      setNewPerson({ name: "", number: "" });
      if (confirmUpdate) {
        const updatePerson = {
          ...existingPerson,
          number: newPerson.number,
        };

        personService
          .updatePerson(existingPerson.id, updatePerson)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id === data.id ? data : person))
            );
          });
        return;
      }
    } else {
      personService
        .addPerson(newPerson)
        .then((data) => setPersons([...persons, data]));
      setNewPerson({ name: "", number: "" });
    }
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

  const deletePerson = (personDelete) => {
    if (window.confirm(`Delete ${personDelete.name}?`)) {
      personService.deletePerson(personDelete.id).then(data => setPersons(persons.filter(person => person.id !== data.id)))
    }
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
      <Persons
        persons={persons}
        textFilter={textFilter}
        deletePerson={deletePerson}
      />
    </>
  );
};

export default App;