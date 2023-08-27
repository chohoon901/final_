import React from 'react'
import Category from '../component/Category'
import './style/Best.scss'
import List from '../component/List'
import axios from "axios";
import { useState } from 'react'



const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization" : localStorage.getItem("jwtToken")
  }
};


function Special() {


  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    let response = await axios.get(
      `http://localhost:8080/get_products/`,

      config
    );
    if (response.status === 200) {
      setProducts(response.data);
    }
  }



  return (
    <div className='specialcontainer'>
            <Category></Category>
        <div className='best'>
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
        <button onClick={getAllProduct}>버튼</button>
        </div>
    </div>
  )
}

export default Special