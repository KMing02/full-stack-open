import { createSlice } from '@reduxjs/toolkit'
import { setNotif } from './notifReducer'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    VoteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const newstate = state.map(n => n.id === id ? changedAnecdote : n)
      return newstate
    },
    Append(state, action) {
      state.push(action.payload)
    },
    Set(state, action) {
      return action.payload
    }
  }
})


export const { VoteAnecdote, Append, Set } = anecdoteSlice.actions

export const Vote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const newAnecdote = await anecdoteService.vote(changedAnecdote)
    dispatch(VoteAnecdote(newAnecdote.id))
  }
}

export const Initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(Set(anecdotes))
  }
}

export const Create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(Append(newAnecdote))
  }
}

export default anecdoteSlice.reducer