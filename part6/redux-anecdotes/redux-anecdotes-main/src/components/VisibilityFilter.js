import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
        filter
      <input 
        type="text" 
        name="filter" 
        onChange={(event) => dispatch(setFilter(event.target.value))}
      />
    </div>
  )
}

export default VisibilityFilter