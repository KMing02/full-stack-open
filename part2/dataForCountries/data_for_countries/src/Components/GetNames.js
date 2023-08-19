import CountryService from "../Services/CountryService"

const GetNames = ({filterString}) => (
    CountryService.getNames(filterString)
)

export default GetNames