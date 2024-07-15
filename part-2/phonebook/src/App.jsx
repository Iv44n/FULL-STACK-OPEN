import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+51-921-853-713" },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
