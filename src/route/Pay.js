import Axios from 'axios';
import React, { useState } from 'react'
import {data, request} from '../data';
import './style/Pay.scss'

function Pay() {

  let [product, setProduct] = useState(request)

  const config = {
    headers: {
      // "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

  const pay = async (product) => {
    let kakaoToken = await Axios.post(
      "http://localhost:8080/payment/ready",
      JSON.stringify(product[0]),
      config
    );
    
    if (kakaoToken.status === 200) {
      console.log('kakao token data print11!!', kakaoToken.data);
      //localStorage.setItem("jwtToken", kakaoToken.data);
      const url = kakaoToken.data.next_redirect_pc_url
      window.location.replace(url);
    }
  }

  return (
  <div>
    <Product product={product}></Product>
    <button onClick={pay}>KakaoPay 결제</button>
  </div>
  )
}

function Product(props) {

  return (
    <div className='product'>
        <img src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img>
        <h3>{props.product[0].name}</h3>
    </div>
  )
}

export default Pay