require('dotenv').config();
// const mongoose = require('mongoose')
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.json());

morgan.token('body', (request) => JSON.stringify(request.body));

// const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'
// app.use(morgan(morganFormat))

// const url = process.env.MONGODB_URI

// mongoose.connect(url)

// const persons = [
//   {
//     id: '1',
//     name: 'Arto Hellas',
//     number: '040-123456'
//   },
//   {
//     id: '2',
//     name: 'Ada Lovelace',
//     number: '39-44-5323523'
//   },
//   {
//     id: '3',
//     name: 'Dan Abramov',
//     number: '12-43-234345'
//   },
//   {
//     id: '4',
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122'
//   }
// ];

app.use(express.static('dist'));

app.get('/api/persons', (request, response) => {
  // response.json(persons)
  Person.find({}).then((persons) => response.json(persons));
});
// app.get('/info', (request, response) => {
//   const count = persons.length;
//   const now = new Date();
//   response.send(
//   `<div>
//     Phonebook has info for ${count} people
//     <br/>
//     ${now}
//   </div>`
//   )
// });

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
  console.log(request.params.id);
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        console.log(person);
        return response.status(404).end();
      }
      return response.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = request.params.id
  // persons = persons.filter(person => person.id !== id)

  // response.status(204).end()
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      const updatedPerson = {
        ...person.toObject(),
        name,
        number,
      };

      return Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
        .then((result) => {
          response.json(result);
        });
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).end();
  }

  const person = new Person({
    name,
    number,
  });

  return person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => {
      console.log('post catch log: ""', error, '""');
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  console.log('errorHandler log: ', error.message);
  console.log('errorHandler log: ', error.name);

  const { name, errors: errObj } = error;

  if (name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (name === 'ValidationError') {
    const errors = Object.values(errObj).map(({ path, message }) => ({
      path,
      message,
    }));
    const errorMessages = errors.map(({ message }) => message);
    return response.status(400).json(errorMessages);
  }

  return next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT);
console.log(`Server are running on PORT ${PORT}`);
