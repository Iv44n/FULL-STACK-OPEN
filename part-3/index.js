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


app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((data) => {
    res.send(`
      <p>Phonebook has info for ${data.length} persons</p>
      <p>${date}</p>
    `);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findById(id).then((data) => {
    res.json(data);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Person.findByIdAndDelete(id).then(() => {
    res.status(204).end()
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(personSaved => {
    res.json(personSaved)
  })
  
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
