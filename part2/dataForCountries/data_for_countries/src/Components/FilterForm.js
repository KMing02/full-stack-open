import React from "react";

const FilterForm = (props) => (
    <form>
        <div>
            find countries <input value = {props.filterString}
            onChange={props.handleFilterChange}/>
        </div>
    </form>
)

export default FilterForm