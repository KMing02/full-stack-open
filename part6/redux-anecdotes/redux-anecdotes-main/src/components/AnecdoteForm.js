import { useDispatch } from 'react-redux'
import { CreateAnecdote } from '../reducers/anecdoteReducer'

const NewNote = () => {

  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(CreateAnecdote(content))
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