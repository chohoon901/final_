import { configureStore, createSlice } from '@reduxjs/toolkit'


let spring = createSlice({
    name: 'spring_server',
    initialState: "http://localhost:8080"
})

let flask = createSlice({
    name: 'flask_server',
    initialState: "http://localhost:8080"
})

let config = createSlice({
  name: 'config',
  initialState : {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  }
})

let dataSlice = createSlice({
  name: 'dataSlice',
  initialState : [],
  reducers: {
      setDataSlice(state, action) {
        return action.payload;
      }
  }
})

let stock = createSlice({
  name : 'stock',
  initialState : [],
  reducers : {
      setCount(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      },
      addCount(state, id) {
          let num = state.findIndex(e => e.id == id.payload)
          state[num].count++
      },
      minusCount(state, id) {
        let num = state.findIndex(e => e.id == id.payload)
        state[num].count--
    }  
  }
})

let orders = createSlice({
  name : 'orders',
  initialState : [],
  reducers : {
      setOrders(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      },
      addValue(state, id) {
          let num = state.findIndex(e => e.id == id.payload)
          state[num].count++
      } ,
      cancelStatus(state, id) {
        return state.map(order =>
          order.id.payload === id.payload ? { ...order, orderStatus : "CANCEL" } : order
        );
      }
  }
})

let isSearch = createSlice({
  name : 'isSearch',
  initialState : false,
  reducers : {
      setSearch(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      }
  }
})

let inputValue = createSlice({
  name : 'inputValue',
  initialState : "",
  reducers : {
      setInputValue(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      }
  }
})

let change = createSlice({
  name : 'change',
  initialState : 0,
  reducers : {
      setChange(state, action) {
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      }
  }
})

let special = createSlice({
  name : 'special',
  initialState : { 
    "pageNumber" : 0,
    "categoryName" : "스킨",
    "sortBy" : "price",
    "sortDirection" : "desc"
  },
  reducers : {
      setSpecial(state, action) {
        console.log(111, action.payload)
        return action.payload; // API에서 받아온 데이터로 상태를 업데이트
      }
  }
})

export let { setSpecial } = special.actions

export let { setDataSlice } = dataSlice.actions

export let { setChange } = change.actions

export let { setInputValue } = inputValue.actions

export let { setSearch } = isSearch.actions

export let { setOrders, cancelStatus } = orders.actions

export let { addCount, minusCount , setCount } = stock.actions

export default configureStore({
reducer: {
  spring : spring.reducer,
  // user : user.reducer,
  stock : stock.reducer,
  config : config.reducer,
  orders : orders.reducer,
  isSearch : isSearch.reducer,
  inputValue : inputValue.reducer,
  change : change.reducer,
  dataSlice : dataSlice.reducer,
  special : special.reducer
}
})
