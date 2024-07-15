import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isIncluded = persons.find(
      (person) => newName.toUpperCase() === person.name.toUpperCase()
    );

    if (isIncluded) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    setPersons([{ name: newName }, ...persons]);
    setNewName("");
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
