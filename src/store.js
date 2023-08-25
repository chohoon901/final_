import { configureStore, createSlice } from '@reduxjs/toolkit'


let spring = createSlice({
    name: 'spring_server',
    initialState: "http://localhost:8080"
})

let flask = createSlice({
    name: 'flask_server',
    initialState: "http://localhost:8080"
})

let stock = createSlice({
  name : 'stock',
  initialState : [],
  reducers : {
      setCount(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      },
      addCount(state, action) {
          const { id, count1 } = action.payload;
          let num = state.findIndex(e => e.id == id)
          // console.log("id", id.payload)
          console.log("addCount = action", action)
          console.log("addCount = id", id)
          console.log("addCount = count1", count1)
          // state[num].count++;

          // if (num !== -1) { // num이 유효한 인덱스인지 확인
          //   if (count1 > state[num]?.count) { // count 변수를 사용하여 비교
          //     state[num].count++;
          //   } else {
          //     state[num].count--;
          //   }
          // } else {
          //   console.log(num)
          // }
      },
      minusCount(state, id) {
          let num = state.findIndex(e => e.id == id.payload)
          state[num].count--
      }  
  }
})


export let { addCount , minusCount, addCart, setCount } = stock.actions

export default configureStore({
reducer: {
  spring : spring.reducer,
  // user : user.reducer,
  stock : stock.reducer
}
})
