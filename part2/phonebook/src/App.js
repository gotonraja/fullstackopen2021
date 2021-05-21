import React, { useEffect, useState } from 'react'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService  from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchTerm, setNewSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)
  
  const normalStatusStyle = {
    background: 'lightgrey',
    color:'green',
    border:'solid green',
    borderRadius: 5,
    fonts:'italic',
    fontSize: 18,
    padding:10,
    margin: 5,
    maxWidth: 500
  }
  
  const errorStatusStyle = {
    background: 'lightgrey',
    color:'red',
    border:'solid red',
    borderRadius: 5,
    fonts:'italic',
    fontSize: 18,
    padding:10,
    margin: 5,
    maxWidth: 500
  } 

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
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${newPerson.name} to phonebook`)
          setNotificationStyle(normalStatusStyle)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationStyle(null)
          }, 5000)
        })
        .catch(error => {
          const errorMsg = error.response.data.error
          setNotificationMessage(`Failed to add ${newPerson.name}: ${errorMsg}`)
          setNotificationStyle(errorStatusStyle)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationStyle(null)
          }, 5000)
        })
    }
    else {
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}

      if (newNumber !== person.number) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`))
        {
          personService
            .update(person.id, changedPerson)
              .then(returnedPerson => {
              setPersons(persons.map( p => p.id !== person.id ? p : returnedPerson))
              setNotificationMessage(`Updated ${changedPerson.name} to phonebook`)
              setNotificationStyle(normalStatusStyle)
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationStyle(null)
              }, 5000) 
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== person.id))
              setNotificationMessage(`Information for ${changedPerson.name} was already deleted from server`)
              setNotificationStyle(errorStatusStyle)
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationStyle(null)
              }, 5000)
            })
        }

      }
      else {
        alert(`${newName} is already added to phonebook`)
      }

    } 
  }
  
  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      const delPerson = persons.find(p => p.id === id)

      personService
        .deleteData(delPerson, id)
        .then(returnedPersons => {
          returnedPersons = persons.filter(person => person.id !== id)
          setPersons(returnedPersons)
          setNotificationMessage(`Deleted ${delPerson.name} from phonebook`)
          setNotificationStyle(normalStatusStyle)
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationStyle(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`Information for ${delPerson.name} was already deleted from server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().indexOf(newSearchTerm.toLowerCase()) !== -1
  )

  return (
    <div>
      <h2> Phonebook </h2>
      <Notification message={notificationMessage} style={notificationStyle}/>
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