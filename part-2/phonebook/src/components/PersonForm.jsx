const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber, newPerson }) => {
  return (
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
  )
}

export default PersonForm