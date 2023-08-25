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
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      item_code: "1",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/payresult?id=",
      fail_url: "http://localhost:3000/payresult?product=788&member=44&pay=fail",
      cancel_url: "http://localhost:3000/payresult?product=788&member=4&pay=cencel"
  }

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization" : "KakaoAK 77671de1f3b849ee736e816accdad58b"
    }
  };

  const pay = async (state) => {
    //console.log(...request)
    
    let kakaoToken = await Axios.post(
      "/api3/payment/ready",
      state,
      config
    );
    
    if (kakaoToken.status === 200) {
      //console.log('kakao token data print11!!', kakaoToken.data);
      //localStorage.setItem("jwtToken", kakaoToken.data);

      // alert("결제 하려고 하고 있음");
      window.localStorage.setItem("tid", kakaoToken.data.tid);
      const url = kakaoToken.data.next_redirect_pc_url
      window.location.replace(url);
    }
  }

  let [product, setProduct] = useState(request)

  // const config = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //     "Authorization" : localStorage.getItem("jwtToken")
  //   }
  // };
  
  // const pay = async (request) => {
  //   //console.log(...request)
    
  //   let kakaoToken = await Axios.post(
  //     "http://localhost:8080/payment/ready",
  //     ...request,
  //     config
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

  return (
  <div>
    <Product product={product}></Product>
    <button onClick={() => {pay(state)}}>KakaoPay 결제</button>
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