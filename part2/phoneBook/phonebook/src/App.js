import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const DisplayNameNumber = ({name, number}) => (
  <div>{name} {number}</div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterWord = {filterWord} handleFilterChange = {handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} newNumber = {newNumber}/>

      <h2>Numbers</h2>
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase())).map(p => <DisplayNameNumber key = {p.name} name = {p.name} number = {p.number}/>)}
      </div>
      <Persons persons = {persons} filterWord = {filterWord} DisplayNameNumber = {DisplayNameNumber}/>
    </div>
  )
}

export default App