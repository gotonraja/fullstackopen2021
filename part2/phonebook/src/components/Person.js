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
    <div>
      {person.name} {person.number}
      <Button handleClick={() => deletePerson(person.name, person.id)} text='Delete'/> 
    </div>
  )
}

export default Persons
