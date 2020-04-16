import React from 'react';

const Persons = ({ persons, search, handleDelete }) => {
    return (
        persons.map(person => {
            if (person.name.toUpperCase().trim().includes(search.toUpperCase().trim())) {
                return <Person key={person.name} person={person} handleDelete={handleDelete}/>
            }
            return '';
        })
    )
}

const Person = ({ person, handleDelete }) => {
    return (
        <div>
            <p key={person.name}><strong>{person.name}-{person.number}</strong></p>
            <button onClick={() => handleDelete(person.name, person.id)}>Delete</button>
        </div>
    )
}

export default Persons;
