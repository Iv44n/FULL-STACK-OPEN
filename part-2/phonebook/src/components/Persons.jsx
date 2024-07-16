const Persons = ({ persons, textFilter }) => {
  return (
    <ul>
      {
        persons.filter(personFilter => personFilter.name.toLowerCase().includes(textFilter.toLowerCase())).map(person => <li key={person.id}>{person.name} {person.number}</li>)
      }
    </ul>
  )
}

export default Persons