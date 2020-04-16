import axios from 'axios';
const URL = 'http://localhost:3000/persons';

const getAll = () => {
    const request = axios.get(URL);
    return request.then(response => response.data);
}

const addNew = (newPerson) => {
    const request = axios.post(URL, newPerson);
    return request.then(response => response.data);
}

const del = (id) => {
    const request = axios.delete(`${URL}/${id}`);
    return request.then(response => response.data);
}

const updateNumber = (id, updatedPerson) => {
    const request = axios.put(`${URL}/${id}`, updatedPerson);
    return request.then(response => response.data);
}

export default {
    getAll,
    addNew,
    updateNumber,
    del
}