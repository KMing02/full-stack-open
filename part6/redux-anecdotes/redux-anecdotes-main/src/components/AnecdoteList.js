import { useSelector, useDispatch } from 'react-redux'
import { Vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {

        return state.filter === '' ?
        state.anecdotes :
        state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
      })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(Vote(id))
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList