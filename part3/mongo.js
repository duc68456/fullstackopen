require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

async function main() {
  // const password = process.argv[2];

  // const url = `mongodb+srv://23520303_db_user:${password}@cluster0.lmstc2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const url = process.env.MONGODB_URI;

  await mongoose.connect(url);

  // const personSchema = new mongoose.Schema({
  //   name: String,
  //   number: String,
  // });

  // const Person = mongoose.model('Person', personSchema)

  if (process.argv.length > 2) {
    // const _name = process.argv[3]
    // const _number = process.argv[4]
    const person = new Person({
      name: process.argv[2],
      number: process.argv[3],
    });

    // await person.save();
    // console.log(`added ${person.name} number ${person.number} to phonebook`);
    person.save().then((savedPerson) => console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`));
  } else {
    const persons = await Person.findById({});

    persons.map((person) => console.log(`${person.name} ${person.number}`));
  }
  mongoose.connection.close();
}

main().catch((err) => console.log(err));

// const url = `mongodb+srv://23520303_db_user:${password}@cluster0.lmstc2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.connect(url);

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: String
// });

// // personSchema.methods.add = function add() {
// //     this.save()
// //     // console.log(`added ${this.name} number ${this.number} to phonebook`)
// // };

// const Person = mongoose.model('Person', personSchema);

// const person = new Person({
//     name: _name,
//     number: _number
// });

// if (process.argv < 3) {
//   Person.find({}).then(responses => {
//     responses.map(response =>
//       console.log(`${response.name} ${response.number}`)
//     )
//   })
//   mongoose.connection.close()
// }

// person.save().then(result => {
//   console.log(`added ${result.name} number ${result.number} to phonebook`)
// });
// mongoose.connection.close()

// async function main() {
//   try {
//     await mongoose.connect(url);

//     const personSchema = new mongoose.Schema({
//       name: String,
//       number: String
//     });

//     personSchema.methods.add = async function add() {
//       await this.save();
//       console.log(`added ${this.name} number ${this.number} to phonebook`);
//     };

//     const Person = mongoose.model('Person', personSchema);

//     const person = new Person({
//       name: _name,
//       number: _number
//     });

//     await person.add();

//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// main();
