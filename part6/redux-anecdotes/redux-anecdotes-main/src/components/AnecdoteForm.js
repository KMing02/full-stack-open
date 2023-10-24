import { useDispatch } from 'react-redux'
import { Create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const NewNote = () => {

  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(Create(content))
    dispatch(setNotification(`you created '${content}'`, 5))
  }

  return (
    <div>
        <h2>Create New</h2>
        <form onSubmit={create}>
        <input name="anecdote" />
        <button type="submit">add</button>
        </form>
    </div>
  )
}

export default NewNote