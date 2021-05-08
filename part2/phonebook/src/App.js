import React, { useState } from 'react'
import {Persons, Filter, PersonForm} from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('Add name ', event.target)
    const exists = persons.some((person) => person.name === newName)
    if (!exists) {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log('Name', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('Number: ', event.target.value)

    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    console.log('Search term', event.target.value)
    setNewSearchName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchTerm={newSearchTerm} 
        handleSearch={handleSearchNameChange}/>

      <h2> Add a new person </h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App