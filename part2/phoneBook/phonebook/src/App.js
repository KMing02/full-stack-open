import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Content from './components/Content'
import personsService from './services/Persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

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
    })
  }

  const replaceNumber = (person, personObject) => {

    personsService
    .update(person.id, personObject)
    .then(personReturned => {
      setPersons(persons.map(p => p.id !== person.id ? p : personReturned))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterWord = {filterWord} handleFilterChange = {handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} newNumber = {newNumber}/>

      <h2>Numbers</h2>

      <Content persons = {persons} filterWord = {filterWord} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App