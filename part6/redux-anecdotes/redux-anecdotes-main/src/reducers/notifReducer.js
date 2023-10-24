import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notifications',
  initialState: 'welcome',
  reducers: {
    setNotif(state, action) {
      return action.payload
    }
  }
})

export const { setNotif } = notifSlice.actions

export const setNotification = (msg, time) => {
  return async dispatch => {
    dispatch(setNotif(msg))
    console.log(msg)
    setTimeout(() => {dispatch(setNotif(''))}, time*1000)
  }
}

export default notifSlice.reducer