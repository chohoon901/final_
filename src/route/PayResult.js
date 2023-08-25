import Search from 'antd/es/input/Search'
import React, { useEffect } from 'react'
import queryString from 'query-string'
import axios from 'axios';

function PayResult() {

  let state = {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: queryString.parse(window.location.search).pg_token
  }

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization" : "KakaoAK 77671de1f3b849ee736e816accdad58b"
    }
  };
  
  
  const pay = async (state) => {
    let kakaoToken = await axios.post(
      "/api3/payment/approve",
      state,
      config
    );
    
    if (kakaoToken.status === 200) {
      //console.log('kakao token data print11!!', kakaoToken.data);
      //localStorage.setItem("jwtToken", kakaoToken.data);
      console.log('kakao token data print11!!', kakaoToken.data);
      // alert("결제 하려고 하고 있음");
      // window.localStorage.setItem("kakaoToken", kakaoToken)
    }
  }
    
  useEffect(() => {
    pay(state);
  }, []); 

  return (
    <div>
      <button onClick={() => {
        console.log(queryString.parse(window.location.search).pg_token)
      }}>버튼</button>
      <div>PayResult</div>
    </div>
  )
}

export default PayResult