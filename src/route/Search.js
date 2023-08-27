import React, { useEffect } from 'react'
import Category from '../component/Category'
import './style/Best.scss'
import List from '../component/List'
import axios from "axios";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue } from '../store';
import { useParams } from 'react-router-dom';



const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization" : localStorage.getItem("jwtToken")
  }
};


function Search() {

    let dispatch = useDispatch();
    const isSearch = useSelector((state) => state.isSearch)
    const inputValue = useSelector((state) => state.inputValue)
    const change = useSelector((state) => state.change)

  
    const [input, setInput] = useState(''); // 검색단어 담김
  
  
  // if(isSearch === true) {
      //   useEffect(() => {
          //     window.location.reload()
        //   })
        // }
        
    const [products, setProducts] = useState([]);
    const { keyword } = useParams(); // URL 파라미터 추출
    
    const getAllProduct = async () => {
      const response = await axios.get(
          `http://localhost:8080/product_search?keyword=${encodeURIComponent(keyword)}`,
      config // 설정에 따라 수정
    );
    if (response.status === 200) {
      console.log(response.data) // 가져오는거 확인 완료
    } 

    };

    useEffect(() => {
      setInput(inputValue)
      dispatch(setInputValue(""))
    }, [change])

    useEffect(() => {
      getAllProduct();
    }, [keyword])
  
  return (
    <div className='container'>
      <button onClick={() => {console.log(input)}}>버튼</button>
        <div className='best'>
          {
            <List title='검색 결과'></List>
          }
        </div>
        <div className='ProductList'>
          <h1></h1>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <div>
                  <img src={product.picture} alt={product.name} />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <p>가격: {product.price}원</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
        <button onClick={getAllProduct}>버튼</button>
        </div>
    </div>
  )
}

export default Search