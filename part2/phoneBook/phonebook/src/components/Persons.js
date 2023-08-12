const Persons = (props) => {
    <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.filterWord.toLowerCase())).map(p => <props.DisplayNameNumber key = {p.name} name = {p.name} number = {p.number}/>)}
    </div>
}

export default Persons