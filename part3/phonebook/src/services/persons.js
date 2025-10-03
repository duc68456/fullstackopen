import axios from 'axios'
// const baseurl = 'http://localhost:3001/persons'
const baseurl = '/api/persons'

const getAllPersons = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const addPerson = (newPerson) => {
    // axios.get(baseurl)
    //     .then(response => response.data)
    //     .then(persons => persons.find(person => person.name === newPerson.name))
    //     .then(person => {
    //         console.log(person)
    //         if(person) {
    //             request = axios.put(`${baseurl}/${person.id}`, newPerson)
    //         }  
    //         else {
    //             request = axios.post(baseurl, newPerson)
    //         }
    //     })
        // .then(persons => persons.map(person => person.name))
        // .then(personNames => personNames.find(newPerson.name))
        // .then(isExist => {
        //     if(isExist)
        //         request = 
        // })
    console.log(newPerson)
    const request = axios.post(baseurl, newPerson)
    return request
            .then(response => response.data)
            .catch(error => {
                console.log(error)
                return Promise.reject(error)
            })
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseurl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log(id)
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => {})
}

export default { getAllPersons, addPerson, updatePerson, deletePerson }