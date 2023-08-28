import Axios from 'axios';
import React, { useState } from 'react'
import {data, request} from '../data';
import './style/Pay.scss'
import { useLocation } from 'react-router-dom';

// {
//   "/api": {
//     "target": "http://localhost:8080"
// },
//   "/kakao": {
//     "target": "https://kapi.kakao.com"
// } 
// },

function Pay() {

  const location = useLocation();

  const id = location.state.id;
  const name = location.state.name;
  const picture = location.state.picture;
  const quantity = location.state.quantity;
  const price = location.state.price;

  let state = {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: name,
      item_code: "1",
      quantity: quantity,
      total_amount: price,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: `http://localhost:3000/payresult?quantity=${encodeURIComponent(quantity)}`,
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
    <Product name={name} picture={picture} quantity={quantity} price={price} id={id} state={state}></Product>
    <button onClick={() => {pay(state)}}>결제하기</button>
  </div>
  )
}

function Product({ name, picture, quantity, price, id ,state }) {

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className='container myPay'>
      <div className='header'>
          <h1>장바구니</h1>
      </div>
      <div className='pay_body'>
        <div style={{ display: 'none' }}>{id}</div>
        <div className='cart_real'>{truncate(name, 30)}</div>
        <div className='cart_real'>{ price }</div> 
        <img src={picture} className='cart_real'></img>
        <div className="cart_real">
          <div style={{ display: 'flex', justifyContent: "center",width:'300px'}}>
            <h6>수량 : {quantity}개</h6>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          {
            state.item_code = id
          }
          {
            console.log(state.item_code)
          }
        </div>
      </div>
    </div>
  )
}

export default Pay