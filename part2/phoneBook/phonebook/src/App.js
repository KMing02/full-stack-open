import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Content from './components/Content'
import personsService from './services/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [notifMessage, setMessage] = useState(null)
  const [operationStatus, setStatus] = useState(true)

  useEffect(() => {
    personsService.getAll()
    .then(personsReturned => {
      setPersons(personsReturned)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        replaceNumber(persons.find(person => person.name === newName), personObject)
        setNewName('')
        console.log('button clicked', event.target)
        return
      }
    }
    personsService
    .create(personObject)
    .then(personReturned => {
      setPersons(persons.concat(personReturned))
      setStatus(true)
      setMessage(`Added ${personReturned.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data.error)
    })

    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))

    personsService
    .delete(person.id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== person.id ? person : null))
      setStatus(true)
      setMessage(`${person.name} is deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const replaceNumber = (person, personObject) => {

    personsService
    .update(person.id, personObject)
    .then(personReturned => {
      setPersons(persons.map(p => p.id !== person.id ? p : personReturned))
      setStatus(true)
      setMessage(`Number of ${personReturned.name} is changed`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setStatus(false)
      setMessage(`Information of ${person.name} has already been removed from server`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message = {notifMessage} success = {operationStatus}/>

      <Filter filterWord = {filterWord} handleFilterChange = {handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} newNumber = {newNumber}/>

      <h2>Numbers</h2>

      <Content persons = {persons} filterWord = {filterWord} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App