const Filter = (props) => (
    <div>
        filter shown with
        <input value = {props.filterWord}
        onChange={props.handleFilterChange}/>
    </div>
)

export default Filter