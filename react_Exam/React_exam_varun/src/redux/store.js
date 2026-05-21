import { createSlice, configureStore } from '@reduxjs/toolkit'
import postsReducer from './postSlice.js'
import authReducer from './authSlice.js'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    
  }
})

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    posts: postsReducer,
    auth: authReducer
  }
})

export default store;
export const { } = counterSlice.actions;