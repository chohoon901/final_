import Search from 'antd/es/input/Search'
import React, { useEffect, useState, Button } from 'react'
import queryString from 'query-string'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '../store';

function PayResult() {

  const [paymentInfo, setPaymentInfo] = useState(null);

  const stock = useSelector((state) => state.stock)

  let state = {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: queryString.parse(window.location.search).pg_token
  }

  const kakaoConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization" : "KakaoAK 77671de1f3b849ee736e816accdad58b"
    }
  };

  const config = useSelector((state) => state.config)
  

  let number = {
    "productIds" : ""
  }

  const pay = async (state, callback) => {
    let kakaoToken = await axios.post(
      "/api3/payment/approve",
      state,
      kakaoConfig
    );
    
    if (kakaoToken.status === 200) {
      //console.log('kakao token data print11!!', kakaoToken.data);
      //localStorage.setItem("jwtToken", kakaoToken.data);
      console.log('kakao token data print11!!', kakaoToken.data);
      console.log(2, kakaoToken.data.item_code)
      number.productIds = kakaoToken.data.item_code
      console.log(3, number)
      // setCart(response.data, () => {
      //   console.log(cart)
      // });
      // alert("결제 하려고 하고 있음");
      // window.localStorage.setItem("kakaoToken", kakaoToken)
      if (callback) {
        callback(number)
      }
    }
  }

  
  const saveOrder = async (number, callback) => {
    console.log(4, number)
    let response = await axios.post(
      "http://localhost:8080/create_orderProduct",
      number,
      config
      );
      
      if (response.status === 200) {
        //console.log('kakao token data print11!!', kakaoToken.data);
        //localStorage.setItem("jwtToken", kakaoToken.data);
        console.log('kakao token data print11!!', response.data);
        console.log("stock = ", stock)
        if (callback) {
          callback()
        }
        // alert("결제 하려고 하고 있음");
        // window.localStorage.setItem("kakaoToken", kakaoToken)
      }
    }

    let dispatch = useDispatch();

    let [cart, setCart] = useState([]);

    const getCart = async () => {
      let response = await axios.get(
        `http://localhost:8080/select_cart/`,
        config
      );
      if (response.status === 200) {
        console.log(2, response.data);
        dispatch(setCount(response.data))
        setCart(response.data, () => {
          console.log(cart)
        });
        console.log("stock = ", stock)
      }
    }
    
    useEffect(() => {
      pay(state, (number) => saveOrder(number, getCart));
    }, []); 

    const handlePaymentComplete = () => {
      // 여기서 실제 결제 API를 호출하고, 결제 정보를 받아온다.
      const mockPaymentData = {
        payment_id: '1',
        amount: 10000,
        products: ['Product 1', 'Product 2'],
      };
  
      setPaymentInfo(mockPaymentData);
    };

  return (
    <div>
      {/* 결제 내용 및 버튼
      <button onClick={handlePaymentComplete}>Complete Payment</button> */}

      {/* 결제 완료 정보 */}
      {paymentInfo && (
        <div>
          <h2>결제가 완료되었습니다.</h2>
          <p>Payment ID: {paymentInfo.payment_id}</p>
          <p>Amount: {paymentInfo.amount}</p>
          <p>결제 상품</p>
          <ul>
            {paymentInfo.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
          <Button>홈</Button>
          <Button>마이페이지</Button>
        </div>
      )}
    </div>
  )
}

export default PayResult