import axios from 'axios';
// const baseurl = 'http://localhost:3001/persons'
const baseurl = '/api/persons';

const getAllPersons = () => {
  const request = axios.get(baseurl);
  return request.then((response) => response.data);
};

const addPerson = (newPerson) => {
  const request = axios.post(baseurl, newPerson);
  return request
    .then((response) => response.data)
    .catch((errorMessages) => {
      // const errorMessages = errors.map(error => error)
      console.log(errorMessages);
      return Promise.reject(errorMessages);
    });
};

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseurl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  console.log(id);
  const request = axios.delete(`${baseurl}/${id}`);
  return request.then(() => {});
};

export default {
  getAllPersons, addPerson, updatePerson, deletePerson,
};
