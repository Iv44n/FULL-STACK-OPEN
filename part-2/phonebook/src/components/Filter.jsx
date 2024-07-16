import React from 'react'

const Filter = ({ filterPerson, textFilter }) => {
  return (
    <input onChange={filterPerson} value={textFilter} />
  )
}

export default Filter