const Persons = ({ persons, textFilter, deletePerson }) => {
  const filteredPersons = persons.filter((personFilter) => personFilter.name.toLowerCase().includes(textFilter.toLowerCase()))

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          <span>{person.name} {person.number}</span>
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
  