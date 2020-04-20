import axios from 'axios';
const URL = 'http://localhost:3001/api/persons';

const getAll = () => {
    const request = axios.get(URL);
    return request.then(response => response.data.phonebook);
}

const addNew = (newPerson) => {
    const request = axios.post(URL, newPerson);
    return request.then(response => response.data.phonebook);
}

const del = (id) => {
    const request = axios.delete(`${URL}/${id}`);
    return request.then(response => response.data.phonebook);
}

const updateNumber = (id, updatedPerson) => {
    const request = axios.put(`${URL}/${id}`, updatedPerson);
    return request.then(response => response.data.phonebook);
}

export default {
    getAll,
    addNew,
    updateNumber,
    del
}