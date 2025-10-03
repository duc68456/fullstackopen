import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    // }, [persons]
    }, []
  )

  const [newName, setNewName] = useState('')

  const [newPhoneNumber, setPhoneNumber] = useState('')

  const [searchInput, setSearchInput] = useState('')

  const [message, setMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleDeletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  // const handleUpdatePerson = (newPerson) => {
  //   updatePerson(id, newPerson)
  // }

  const nameValue = newName
  const phoneValue = newPhoneNumber
  const searchValue = searchInput

  const filteredPersons = searchValue === '' ?
    persons :
    persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { 
      name : newName,
      number: newPhoneNumber,
    }
    const isExisted = persons.find(person => person.name === newPerson.name)
    // console.log(isExisted)
    if (isExisted === undefined) {
    // console.log(newPerson.name)
    // console.log(newPerson.number)
    console.log(newPerson)
    personService.addPerson(newPerson)
      .then(responsePerson => {
      console.log(responsePerson)
      setMessage(`Added ${responsePerson.name}`)
      setPersons(persons.concat(responsePerson))
      setTimeout(() => {
        setMessage(null)}, 5000
      )
    })
      .catch(error => {
        console.log(error)
        setErrorMessage(error.response?.data?.error)
        setTimeout(() => {
          setErrorMessage(null)}, 5000
        )
      })
    // setPersons(persons.concat(newPerson)) //
    // setNewName('')
    // setPhoneNumber('')
    }
    else {
      // alert(`${newName} is already added to phonebook`)
      console.log(isExisted)
      if (window.confirm(`${isExisted.name} is already added to phonebook, replace the old number with the new one?`)) {
        // personService.updatePerson(isExisted.id, newPerson)
        // const updatedPerson = { ...isExisted, number: newPhoneNumber}
        // setPersons(persons.map(person => person.id === isExisted.id ? updatedPerson : person))
        const updatedPerson = { ...isExisted, number: newPhoneNumber}
        personService.updatePerson(isExisted.id , updatedPerson)
          .then(returnedPerson => setPersons(persons.map(person => 
            person.id === isExisted.id ? returnedPerson : person
          )))
          .catch(error =>
            setErrorMessage(`Information of ${isExisted.name} has already been removed from server`)
          )
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message = {message} />

      <ErrorNotification message = {errorMessage} />

      <Filter searchValue={searchValue}
              handleSearchChange={handleSearchChange}
      />

      <h3>add a new</h3>

      <PersonForm handleSubmit={handleSubmit}
                  nameValue={nameValue}
                  handleNameChange={handleNameChange}
                  phoneValue={phoneValue}
                  handlePhoneChange={handlePhoneChange}
      />

      <h3>Numbers</h3>
      
      <Persons handleDeletePerson = {handleDeletePerson} persons = {filteredPersons} />
    </div>
  )
}

export default App