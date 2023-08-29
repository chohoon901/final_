import React, { useEffect } from 'react'
import Category from '../component/Category'
import './style/Special.scss'
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


function Special() {

  let dispatch = useDispatch();
  const isSearch = useSelector((state) => state.isSearch)
  const inputValue = useSelector((state) => state.inputValue)
  const change = useSelector((state) => state.change)

  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    let response = await axios.get(
      `/api4/get_products/`,

      config
    );
    if (response.status === 200) {
      setProducts(response.data);
    }
  }



  return (
    <div className='specialcontainer'>
        <div className='best_container'>
            <Category></Category>
            <List title='특가'></List>
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
        { <button onClick={getAllProduct}>버튼</button> }
        </div>
    </div>
  )
}

export default Special