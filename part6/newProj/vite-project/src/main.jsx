import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

import filterReducer from './reducers/filterReducer'

import noteService from './services/notes'
import noteReducer, { setNotes } from './reducers/noteReducer'

noteService.getAll().then(notes =>
  store.dispatch(setNotes(notes))
)

console.log(store.getState())

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

