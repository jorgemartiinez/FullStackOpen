import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddNew from './components/AddNew';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response.data);
        setPersons(response.data);
      });
  }, []);

  const handleNoteChange = (e) => {
    let inputNameValue = e.target.value;
    setNewName(inputNameValue);
  }

  const handlePhoneChange = (e) => {
    let inputPhoneValue = e.target.value;
    setNewPhone(inputPhoneValue);
  }

  const handleSearch = (e) => {
    let inputSearchValue = e.target.value;
    setSearch(inputSearchValue);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let personExists = persons.find(person => person.name.toUpperCase().trim() === newName.toUpperCase().trim());

    if (personExists) {
      return alert(`${newName} is already added to phonebook!!`);
    }

    let newPerson = {
      name: newName,
      number: newPhone
    };
    let newList = persons.concat(newPerson);
    setPersons(newList);

    console.log('New person added', persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <AddNew newPhone={newPhone}
        newName={newName}
        handleFormSubmit={handleFormSubmit}
        handleNoteChange={handleNoteChange}
        handlePhoneChange={handlePhoneChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;