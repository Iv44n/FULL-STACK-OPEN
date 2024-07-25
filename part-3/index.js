const express = require("express");
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))


let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateUniqueId = () => {
  const randomSuffix = Math.floor(Math.random() * 100) + 1234;
  const timestamp = Date.now().toString().slice(-8)
  const id = parseInt(timestamp) + randomSuffix;
  return id
}

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${data.length} persons</p>
    <p>${date}</p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((info) => info.id === id);

  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((info) => info.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body
  const personExists = data.find(info => body.name?.toUpperCase() === info.name?.toUpperCase())

  if (personExists || !body.name || !body.number) {
    return res.status(400).json({
      error: 'name must be unique or name or number missing'
    })
  }

  const newPerson = {
    id: generateUniqueId(),
    ...body
  }

  data = [...data, newPerson]
  res.json(newPerson)
})

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
