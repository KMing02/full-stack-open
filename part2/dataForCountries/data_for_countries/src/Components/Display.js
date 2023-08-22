import Countries from './Countries'
import ShowCountry from './ShowCountry'

const Display = ({ allData,filterString }) => {
    const filteredData = allData.filter(d => d.name.common.toLowerCase().includes(filterString.toLowerCase()))
    const countryList = filteredData.map(d => d.name.common)

    if (countryList.length > 9) {
        return(`Too many matches, specify another filter`)
    }

    if ((countryList.length > 1) && (countryList.length < 10)) {
        return (
        <Countries countries = {countryList} data = {filteredData}/>
        )
    }

    if (countryList.length === 1) {
        return (
            <>
            <ShowCountry data = {filteredData[0]}/>
            </>
        )
    }

    if (countryList.length === 0) {
        return(`No match, change your input`)
    }
}

export default Display