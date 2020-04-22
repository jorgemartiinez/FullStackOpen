const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jorgemartiinez19:${password}@cluster0-hbudo.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


const personSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    }
});

const Person = model('Person', personSchema, 'phonebook');

const name = process.argv[3];
const number = process.argv[4];

/* find person if we dont have the params */
if (!name || !number) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close();
    })
} else {
    /* add person */
    const person = new Person({
        name: name,
        number: number
    });

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}