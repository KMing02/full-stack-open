import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer, { Set } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notifReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notifications: notifReducer
    }
})

console.log(store.getState())

export default store