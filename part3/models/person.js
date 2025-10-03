const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: String,
})

const url = process.env.MONGODB_URI

mongoose.connect(url)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;