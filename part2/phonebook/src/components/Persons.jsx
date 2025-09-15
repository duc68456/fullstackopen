import Person from './Person.jsx'

const Persons = ({ persons, handleDeletePerson }) => {
    return (
        <ul>
            {persons.map(person => <Person handleDeletePerson = {handleDeletePerson} key = {person.name} person={person} />)}
        </ul>
    )
}

export default Persons