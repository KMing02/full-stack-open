const ShowCountry = ({data}) => {
    if (data === undefined) {
        return(null)
    }
    const name = data.name.common
    const capital = data.capital
    const area = data.area
    const languages = Object.values(data.languages)
    const flagUrl = data.flags.png
    return (
        <>
        <h2>{name}</h2>
        <div>capital {capital}</div>
        <div>area {area}</div>
        <h3>languages:</h3>

        <ul>
            {languages.map(l => <li key = {l}>{l}</li>)}
        </ul>

        <div><img src={flagUrl}/></div>
        </>
    )
}

export default ShowCountry