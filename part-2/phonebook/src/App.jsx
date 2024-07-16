import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
    id: persons.length + 1
  });

  const [textFilter, setTextFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isIncluded = persons.find(
      (person) => newPerson.name.toUpperCase() === person.name.toUpperCase()
    );

    if (isIncluded) {
      alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({
        name: "",
        number: "",
      });
      return;
    }

    setPersons([newPerson, ...persons]);
    setNewPerson({
      name: "",
      number: "",
    });
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
    <div>
      <h1>Phonebook</h1>
      <input onChange={filterPerson} value={textFilter} />
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangeName} value={newPerson.name} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} value={newPerson.number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.filter(personFilter => personFilter.name.toLowerCase().includes(textFilter.toLowerCase())).map(person => <li key={person.id}>{person.name} {person.number}</li>)
        }
      </ul>
    </div>
  );
};

export default App;
