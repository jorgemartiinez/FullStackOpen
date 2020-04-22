const express = require('express');
const app = express();

const Person = require('../models/person.model');

/* GET METHODS */

app.get('/', (req, res) => {
    return res.send(`
    <h1>Index of the project</h1>
    <ul>
    <li><a href="info">Info</li>
    <li><a href="/api/persons">List persons</li>
    </ul>`);
});

app.get('/persons', (req, res) => {
    Person.find({})
        .then(persons =>
            res.json({
                ok: true,
                phonebook: persons
            })
        )
        .catch(err => {
            console.log(err);
            res.status(400).send({ ok: false, err })
        });
});

app.get('/info', (req, res, next) => {

    Person.countDocuments({})
        .then(count => {
            const time = new Date();
            return res.send(`
            <p>Phonebook has info for ${count} people.</p>
            <p>${time}</p>`)
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
});

app.get('/persons/:id', (req, res, next) => {

    let id = req.params.id;

    Person.findById(id)
        .then(person => {
            if (!person) {
                return res.status(404).json({
                    ok: false,
                    err: 'The person that you are trying to request doesn\'t exist. Please try again'
                });
            }

            return res.json({
                ok: true,
                phonebook: person
            });
        }).catch(err => {
            console.log(err);
            next(err);
        })
});





app.post('/persons', (req, res, next) => {

    let body = req.body;

    if (!body.name || !body.number) { // name and number are required!
        return res.status(400).json({
            ok: false,
            message: 'The name and the number are required'
        })
    }

    let newPerson = new Person({
        name: body.name,
        number: body.number
    });

    newPerson.save()
        .then(newPerson => {
            return res.json({
                ok: true,
                message: 'New person added',
                phonebook: newPerson
            })
        })
        .catch(err => next(err));
});

app.put('/persons/:id', (req, res, next) => {

    let id = req.params.id;
    let body = req.body;

    let updatedPerson = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(id, updatedPerson, {new: true})
        .then(person => {
            if (!person) {
                return res.status(404).json({
                    ok: false,
                    err: 'The person that you are trying to update doesn\'t exist. Please try again!'
                });
            }
            return res.json({
                ok: true,
                message: 'Person updated succesfully',
                phonebook: person
            })

        })
        .catch(err => {
            console.log(err);
            next(err);
        })


});

/* DELETE PERSON ROUTE */

app.delete('/persons/:id', (req, res, next) => {

    let id = req.params.id;

    Person.findByIdAndRemove(id)
        .then(person => {

            if (!person) {
                return res.status(404).json({
                    ok: false,
                    err: 'The person that you are trying to delete doesn\'t exist. Please try again'
                });
            }

            return res.json({
                ok: true,
                message: 'Person deleted succesfully',
                phonebook: person
            })

        })
        .catch(err => {
            console.log(err);
            next(err);
        })
});

module.exports = app;