require('dotenv').config();
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person');

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))


app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.find({}).then((data) => {
    res.send(`
      <p>Phonebook has info for ${data.length} persons</p>
      <p>${date}</p>
    `);
  }).catch(next);
});

app.get("/api/persons", (req, res, next) => {
  Person.find({}).then((data) => {
    res.json(data);
  }).catch(next);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id).then((data) => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({ error: 'person not found' });
    }
  }).catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id).then(result => {
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).send({ error: 'person not found' });
    }
  }).catch(next);
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(personSaved => {
    res.json(personSaved)
  }).catch(next)
  
})

app.use((req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
})

app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
