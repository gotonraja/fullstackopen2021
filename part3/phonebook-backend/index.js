const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

morgan.token('person', function(req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
  {
    "name": "Dan Abramov",
    "number": "450-3450-321",
    "id": 1
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 2
  },
  {
    "name": "Bob Marley",
    "number": "420-420-240",
    "id": 3
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook<h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const date = new Date()
  response.send(`<div>Phonebook has ${persons.length} persons</div><div> ${date}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  id = Number(request.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } 
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const id = Math.floor(Math.random() * (1000 - 1) + 1)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  const exists = persons.find(p => p.name === body.name)
  
  if (exists) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Phonebook server running on ${PORT}`)
})