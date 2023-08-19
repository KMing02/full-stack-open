const OneCountry = ({name,capital,area,languages,flagUrl}) => {

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

export default OneCountry