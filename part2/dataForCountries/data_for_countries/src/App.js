import './App.css';
import { useState, useEffect } from 'react';
import FilterForm from './Components/FilterForm'
import CountryService from './Services/CountryService';
import Display from './Components/Display'

const App = () => {
  const [filterString, setFilterString] = useState('')
  const [allData, setAllData] = useState([])
  const [countriesShown, setCountriesShown] = useState([])

  useEffect(() => {
    CountryService.getAllData()
    .then(dataReturned => {
      setAllData(dataReturned)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }
  

  return (
    <div>
      <FilterForm filterString = {filterString} handleFilterChange = {handleFilterChange}/>

      <Display allData = {allData} filterString = {filterString}/>
    </div>
  )
}

export default App