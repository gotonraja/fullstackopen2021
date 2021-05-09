import React from 'react'

const Persons = ({persons}) => {
  return(
    <div>
    {persons.map(person =>
      <Person key={person.name} person={person} />)}
    </div>
  )
  
}

const Person = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const PersonForm = ({name, number, handleNameChange, handleNumberChange, addPerson }) =>
{
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
          <input
          value={name}
          onChange={handleNameChange} />
      </div>

      <div>
        number:
        <input
          value={number}
          onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <form>
    <div>
      Filter shown with:
        <input
        value={searchTerm}
        onChange={handleSearch} />
    </div>
  </form>
  )
}

export {Persons, PersonForm, Filter}
