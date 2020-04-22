import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddNew from './components/AddNew';
import Persons from './components/Persons';
import Notification from './components/Notification';
import PhoneBookService from './services/PhoneBook';
import PhoneBook from './services/PhoneBook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });

  useEffect(() => {
    PhoneBookService.getAll()
      .then(persons => setPersons(persons));
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

    if (personExists) { // the person exists, let's check if wants to change his number
      let changedPerson = { ...personExists, number: newPhone }; // copy of the person with the number changed
      if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one`)) {
        PhoneBook.updateNumber(personExists.id, changedPerson)
          .then(changedPerson => {
            setPersons(persons.map(person => (person.id !== changedPerson.id) ? person : changedPerson))
            setNotification({ message: `Phone of ${changedPerson.name} updated!`, type: 'success' })
          })
          .catch(err => setNotification({ message: `Error updating number`, type: 'error' }));
      }
    } else { // person not exists, let's add a new one
      let newPerson = { name: newName, number: newPhone };
      PhoneBookService.addNew(newPerson)
        .then(newPerson => {
          setNotification({ message: `New person added`, type: 'success' })
          setPersons(persons.concat(newPerson))
        })
        .catch(err => setNotification({ message: `Error adding new person ${err.response.data.err}`, type: 'error' }));
      }
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure that you want to delete ${name}?`)) {
      PhoneBookService.del(id)
        .then(deletedNote => {
          setNotification({ message: `Deleted succesfully`, type: 'success' });
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(err => setNotification({ message: `Error: ${name} it's already deleted`, type: 'error' }));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <AddNew newPhone={newPhone}
        newName={newName}
        handleFormSubmit={handleFormSubmit}
        handleNoteChange={handleNoteChange}
        handlePhoneChange={handlePhoneChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} handleDelete={handleDelete} />
    </div>
  );
};

export default App;