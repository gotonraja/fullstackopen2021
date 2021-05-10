import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Persons, Filter, PersonForm} from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')

  const hook = () => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fullfiled')
          setPersons(response.data)
        })
  }

  useEffect(hook, [])

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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setNewSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1)

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter 
        searchTerm={newSearchTerm} 
        handleSearch={handleSearchTermChange}/>

      <h2> Add a new person </h2>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}/>
      
      <h2> Numbers </h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App