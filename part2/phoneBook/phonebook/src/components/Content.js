import React from 'react'
import Person from './Person'

const Content = ({persons, filterWord, deletePerson}) => {
    console.log(persons.length)
        return (
        <ul>
            {persons
            .filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()))
            .map((person, i) => 
                <Person key = {i} person = {person} deletePerson = {deletePerson}/>
        )}
        </ul>
        )
}

export default Content