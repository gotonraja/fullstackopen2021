import React, { useEffect, useState } from 'react'
import {Persons, Filter, PersonForm} from './components/Person'
import personService  from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.some((person) => person.name === newName)

    if (!exists) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
          .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      alert(`${newName} is already added to phonebook`)
    } 
  }

  const deletePerson = (name, id) => {

    if (window.confirm(`Delete ${name}?`)) {
      const delObj = persons.find(p => p.id === id)
      personService
        .deleteData(delObj, id)
        .then(returnedPersons => {
          returnedPersons = persons.filter(person => person.id !== id)
          setPersons(returnedPersons)
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1
  )

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter 
        searchTerm={newSearchTerm} 
        handleSearch={(event) => setNewSearchTerm(event.target.value)}/>
      <h2> Add a new person </h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleNameChange={(event) => setNewName(event.target.value)} 
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        addPerson={addPerson}/>
      <h2> Numbers </h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App