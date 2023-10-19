import { useSelector, useDispatch } from 'react-redux'
import { Vote } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {

        return state.filter === '' ?
        state.anecdotes :
        state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
      })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(Vote(anecdote.id))
        dispatch(setNotif(`you voted '${anecdote.content}'`))
        setTimeout(() => 
            dispatch(setNotif(''))
        , 5000)
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
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList