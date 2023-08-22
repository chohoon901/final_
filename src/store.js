import { configureStore, createSlice } from '@reduxjs/toolkit'


let spring = createSlice({
    name: 'spring_server',
    initialState: "http://localhost:8080"
})

let flask = createSlice({
    name: 'flask_server',
    initialState: "http://localhost:8080"
})


export default configureStore({
  reducer: {
    spring : spring.reducer
  }
}) 