import { useState } from "react"
import ShowCountry from "./ShowCountry"

const handleClick = (data, set) => {
    set(data[0])
}

const Countries = ({countries, data}) => {
    const [rendered, setRendered] = useState()
    return(
        <div>
            {countries.map((country) => 
            <div key = {country}>
                {country} <button onClick={() => handleClick(data.filter(c => c.name.common === country), setRendered)}>show</button>
            </div>)
            }
            <ShowCountry data = {rendered}/>
        </div>
    )
}
export default Countries