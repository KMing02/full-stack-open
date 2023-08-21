import axios from 'axios'
import { useEffect,useState } from 'react'

const absoluteToCelsius = (temp) => {
    return(temp -= 273.15)
}

const Weather = ({data}) => {
    const latlng = data.capitalInfo.latlng
    const lat = latlng[0]
    const lng = latlng[1]
    const API_KEY = process.env.REACT_APP_API_KEY
    const [weatherInfo, setInfo] = useState([])

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
        .then(res => {
            setInfo(res.data)
        })
        .catch(err => console.log(err))
    }, [lat, lng])

    console.log(weatherInfo)

    if (weatherInfo.main === undefined) {
        return('loading...')
    } else {
        return(
            <>
                <h3>{`Weather in ${data.capital}`}</h3>
                <div>{`temperature ${absoluteToCelsius(weatherInfo.main.temp)} Celsius`}</div>
            </>
        )
    }
}

export default Weather