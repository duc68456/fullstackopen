require('dotenv').config()
// const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'
// app.use(morgan(morganFormat))

// const url = process.env.MONGODB_URI

// mongoose.connect(url)

let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons =>
      response.json(persons)
    )
})

app.get('/info', (request, response) => {
    const count = persons.length;
    const now = new Date()
    response.send(
    `<div>
      Phonebook has info for ${count} people
      <br/>
      ${now}
    </div>`
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = request.params.id
    // const person = persons.find(person => person.id === id)
    // if(!person) {
    //     return response.status(404).end()
    // } else {
    //     response.json(person)
    // }
    // if(!persons.find(person => person.id === id)) {
    //     return response.status(404).json({
    //         error: 'Not found'
    //     })
    // }
    // response.json(persons.find(person => person.id === id))
    console.log(request.params.id)
    Person.findById(request.params.id)
      .then(person => {
        if(!person) {
          console.log(person)
          return response.status(404).end()
        } else {
          return response.json(person)
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    // persons = persons.filter(person => person.id !== id)

    // response.status(204).end()
    Person.findByIdAndDelete(request.params.id)
      .then(result =>
          response.status(204).end()
      )
      .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body
  Person.findById(request.params.id)
    .then(person => {
      if(!person) {
        return response.status(404).end()
      } else {

        person.name = name
        person.number = number

        return person.save()
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
      }
    })
})

const generateId = () => {
    const maxId = persons.length > 0 ?
    0 : 
    Math.max(...persons.map(person => person.id))
    return String(Math.floor(maxId + 1 + Math.random() * 9999))
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    // const genId = generateId();

    if(!body.name || !body.number) {
      return response.status(400).end()
    } 
    if (persons.find(person => person.name === body.name)) {
      return response.status(409).end()
    }
    const person = new Person({
        // id : genId,
        name : body.name,
        number : body.number,
    })
    // persons = persons.concat(person)
    // response.json(person)
    person.save().then(savedPerson =>
      response.json(savedPerson)
    )
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT)
console.log(`Server are running on PORT ${PORT}`)