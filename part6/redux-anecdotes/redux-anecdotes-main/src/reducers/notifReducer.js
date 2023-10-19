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
export default notifSlice.reducer