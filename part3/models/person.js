const mongoose = require('mongoose');

const validator = (number) => {
  let isAnyHyphen = false;
  if (number.length < 8) return false;

  let firstPart = '';
  let secondPart = '';

  for (const c of number) {
    if (c === '-') {
      if (isAnyHyphen) return false;
      isAnyHyphen = true;
      continue;
    }
    if (!isAnyHyphen)
      firstPart += c; else  { secondPart += c; }
  }

  if (firstPart.length < 2 || firstPart.length > 3) return false;

  for (const c of secondPart) {
    if (c < '0' || c > '9') return false;
  }

  return true;
};

const personSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: validator,
      message: (props) => {
        console.log('personSchema log: ', props);
        return `${props.value} is not a valid number`;
      },
    },
  },
});

const url = process.env.MONGODB_URI;

mongoose.connect(url);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id,
    delete returnedObject.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;