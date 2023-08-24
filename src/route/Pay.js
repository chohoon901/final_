import Axios from 'axios';
import React, { useState } from 'react'
import {data, request} from '../data';
import './style/Pay.scss'

// {
//   "/api": {
//     "target": "http://localhost:8080"
// },
//   "/kakao": {
//     "target": "https://kapi.kakao.com"
// } 
// },

function Pay() {

  let state = {
    // 응답에서 가져올 값들
    next_redirect_pc_url: "",
    tid: "",
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/",
      fail_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    }
  }

  // const config = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //     "Authorization" : "KakaoAK 77671de1f3b849ee736e816accdad58b"
  //   }
  // };

  // const pay = async (state) => {
  //   //console.log(...request)
  //   console.log("pay 시작")
  //   console.log(state)
  //   console.log("config")
  //   console.log(config)
    
  //   let kakaoToken = await Axios.post(
  //     "/log/payment/ready",
  //     config,
  //     state
  //   );
    
  //   if (kakaoToken.status === 200) {
  //     //console.log('kakao token data print11!!', kakaoToken.data);
  //     //localStorage.setItem("jwtToken", kakaoToken.data);

  //     alert("결제 하려고 하고 있음");
  //     const url = kakaoToken.data.next_redirect_pc_url
  //     window.location.replace(url);
  //     alert("결제 결과!!=", kakaoToken);
  //   }
  // }

  let [product, setProduct] = useState(request)

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };
  
  const pay = async (request) => {
    //console.log(...request)
    
    let kakaoToken = await Axios.post(
      "http://localhost:8080/payment/ready",
      ...request,
      config
    );
    
    if (kakaoToken.status === 200) {
      //console.log('kakao token data print11!!', kakaoToken.data);
      //localStorage.setItem("jwtToken", kakaoToken.data);
      alert("결제 하려고 하고 있음");
      const url = kakaoToken.data.next_redirect_pc_url
      window.location.replace(url);
      alert("결제 결과!!=", kakaoToken);
    }
  }

  return (
  <div>
    <Product product={product}></Product>
    <button onClick={() => {pay(product)}}>KakaoPay 결제</button>
  </div>
  )
}

function Product(props) {

  return (
    <div className='product'>
        <img src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img>
        <h3>{props.product[0].item_name}</h3>
    </div>
  )
}

export default Pay