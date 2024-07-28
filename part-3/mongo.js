const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@full-stack-open.lupirot.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=full-stack-open`;

mongoose.connect(url);

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', userSchema);

if (process.argv.length === 5) {
  const userName = process.argv[3];
  const userNumber = process.argv[4];

  const person = new Person({
    name: userName,
    number: userNumber,
  });

  return person.save().then(({ name, number }) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

Person.find({}).then((result) => {
  console.log('phonebook:');
  result.forEach((res) => {
    console.log(res.name, res.number);
  });
  mongoose.connection.close();
});
