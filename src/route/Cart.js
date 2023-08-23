import './style/Cart.scss'
import { LiaPlusSolid, LiaEqualsSolid } from "react-icons/lia"
import axios from "axios";
import React, { useEffect, useState } from 'react'

function Cart() {

    const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization" : localStorage.getItem("jwtToken")
        }
      };

    let [comments, setComments] = useState([]);

    let [cart, setCart] = useState([]);

    const getCart = async () => {
        let response = await axios.get(
          `http://localhost:8080/select_cart/`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data);
          setCart(response.data);

        }
      }
    
    return (
        <div>
            <CartBody cart={cart}></CartBody>
            <div>
        </div>
        <button onClick={getCart}>버튼</button>
        </div>
    )
}

function CartBody(props) {

    return (
        <div className='container myCart'>
            <div className='header'>
                <h1>장바구니</h1>
            </div>
            <div className='container body'>
                <div> map 사용해서 물품 나열 </div>
            </div>
            <div>
                {
                  props.cart.map((body, index) => (
                    <div className='cart_body'>
                      <div id={index} className='cart_real'>{body.name}</div>
                      <div id={index} className='cart_real'>{ body.price }</div> 
                      {/* 나중에 할인값 불러와야함(스프링에서 처리) */}
                      <div id={index} className='cart_real'>{body.picture}</div>
                    </div>  
                  ))
                }
            </div>
            <div className='result px-5 py-5'>
                <h6>총 상품가격</h6>
                <h6>0</h6>
                <h6>원</h6>
                <LiaPlusSolid></LiaPlusSolid>
                <h6>총 배송비</h6>
                <h6>0</h6>
                <h6>원</h6>
                <LiaEqualsSolid></LiaEqualsSolid>
                <h6>총 주문금액</h6>
                <h6>0</h6>
                <h6>원</h6>
            </div>
    </div>
    )
}

export default Cart;