import React from 'react';

const Persons = ({ persons, search }) => {
    return (
        persons.map(person => {
            if (person.name.toUpperCase().trim().includes(search.toUpperCase().trim())) {
                return <Person key={person.name} person={person} />
            }
            return '';
        })
    )
}

const Person = ({ person }) => {
    return (
        <div>
            <p key={person.name}><strong>{person.name}-{person.number}</strong></p>
        </div>
    )
}

export default Persons;
