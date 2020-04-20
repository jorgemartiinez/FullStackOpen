const express = require('express');
const app = express();
const PORT = 3001;
const morgan = require('morgan');
const {requestLogger, unknownEndpoint} = require('./middlewares/middlewares');
// express config
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// morgan logs config
morgan.token('body', function (request, response) { return JSON.stringify(request.body) }); // new token to stringify the body inside request
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body')); // custom morgan config to show body params

// custom middlewares
app.use(requestLogger);
app.use(unknownEndpoint);

let phonebook = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "231312312312"
    },
    {
        id: 2,
        name: "Person2",
        number: "63634534534"
    },
    {
        id: 3,
        name: "Person3",
        number: "85673673556"
    }
]


app.get('/api/persons', (req, res) => {
    return res.json({
        ok: true,
        phonebook
    });
});

app.get('/info', (req, res) => {

    const time = new Date();

    return res.send(`
    <p>Phonebook has info for ${phonebook.length} people.</p>
    <p>${time}</p>`);

});

app.get('/api/persons/:id', (req, res) => {

    let id = req.params.id;
    let exists = phonebook.find(person => person.id == id);
    console.log(exists);

    if (!exists) { // id doesn't exist
        return res.status(404).json({
            ok: false,
            err: 'The person that you are trying to request doesn\'t exist. Please try again'
        });
    }

    res.json({
        ok: true,
        phonebook: exists
    });

});


app.delete('/api/persons/:id', (req, res) => {

    let id = req.params.id;
    let exists = phonebook.find(person => person.id == id);

    if (!exists) { // id doesn't exist
        return res.status(404).json({
            ok: false,
            err: 'The person that you are trying to delete doesn\'t exist. Please try again'
        });
    }

    phonebook = phonebook.filter(person => person.id !== Number(id));
    console.log('Filtered phonebooks', phonebook);
    res.json({
        ok: true,
        message: 'Note succesfully deleted',
        phonebook
    })

});


app.post('/api/persons', (req, res) => {

    let body = req.body;

    if(!body.name || !body.number){ // name and number are required!
        return res.status(400).json({
            ok: false,
            message: 'The name and the number are required'
        })
    }

    let nameExists = phonebook.find(person => person.name.toUpperCase().trim() === body.name.toUpperCase().trim());

    if(nameExists){ // name already exists!
        return res.status(409).json({
            ok: false,
            message: 'The name of this person already exists on the phonebook'
        })
    }

    // no errors, let's add
    let newPerson = {
        id: Math.random().toString(36).substr(2, 9),
        name: body.name,
        number: body.number
    };

    phonebook = [...phonebook, newPerson];

    res.json({
        ok: true,
        phonebook
    })

});

app.listen(PORT, (err) => console.log(`Server listening on port ${PORT}`));
