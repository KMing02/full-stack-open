import axios from 'axios'
const allDataAPI = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const nameAPI = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAllData = () => {
    const request = axios.get(allDataAPI)
    return request.then(response => response.data)
}

const getNames = ({name}) => {
    const request = axios.get(`nameAPI${name}`)
    return request.then(response => response.data)
}


export default {
    getAllData: getAllData,
    getNames: getNames
}