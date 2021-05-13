import React from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Persons = ({persons , deletePerson}) => {
  return (
    <div>
    {persons.map( (person) =>
      <Person key={person.name} person={person} deletePerson={deletePerson}/> )}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <Button handleClick={() => deletePerson(person.name, person.id)} text='Delete'/> 
    </li>
  )
}

const PersonForm = ({name, number, handleNameChange, handleNumberChange, addPerson }) =>
{
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
          <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number:
          <input value={number} onChange={handleNumberChange} />
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
        <input value={searchTerm} onChange={handleSearch} />
    </div>
    </form>
  )
}

export {Persons, PersonForm, Filter}
