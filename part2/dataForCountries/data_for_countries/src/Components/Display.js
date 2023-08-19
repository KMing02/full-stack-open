import Countries from './Countries'
import OneCountry from './OneCountry'
import CountryService from '../Services/CountryService'

const Display = ({ allData,filterString }) => {
    const filteredData = allData.filter(d => d.name.common.toLowerCase().includes(filterString.toLowerCase()))
    const countryList = filteredData.map(d => d.name.common)

    if (countryList.length > 9) {
        return(`Too many matches, specify another filter`)
    }

    if ((countryList.length > 1) && (countryList.length < 10)) {
        return (
        <Countries countries = {countryList}/>
        )
    }

    if (countryList.length === 1) {
        const data = filteredData[0]
        console.log(filteredData[0])
        const name = data.name.common
        const capital = data.capital
        const area = data.area
        const languages = Object.values(data.languages)
        const flagUrl = data.flags.png
        return (
            <OneCountry name = {name} capital = {capital} area = {area} languages={languages} flagUrl = {flagUrl}/>
        )
    }

    if (countryList.length === 0) {
        return(`No match, change your input`)
    }
}

export default Display