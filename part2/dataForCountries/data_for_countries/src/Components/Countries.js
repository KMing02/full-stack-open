const Countries = ({countries}) => {
    return(
        <div>
            {countries.map((country) => <div key = {country}>{country}</div>)}
        </div>
    )
}
export default Countries