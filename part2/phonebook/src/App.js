import React, { useState } from 'react'

const Person = ({ person }) => {
  // console.log(person)
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchName, setNewSearchName] = useState('')


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

  // const filteredNames = persons.filter( person => person.name.includes(newSearchName) )
  const filteredNames = persons.filter(person =>
    person.name.toLowerCase().indexOf(newSearchName.toLowerCase()) != -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with:
            <input
            value={newSearchName}
            onChange={handleSearchNameChange} />
        </div>
        
      </form>
      <h2> Add a new person </h2>
      <form onSubmit={addPerson}>
        <div>
          name:
           <input
            value={newName}
            onChange={handleNameChange} />
        </div>

        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {filteredNames.map(person =>
          <Person key={person.name} person={person} />)}
      </div>

    </div>
  )
}

export default App