import './style/Cart.scss'
import { LiaPlusSolid, LiaEqualsSolid } from "react-icons/lia"
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount, setCount } from '../store';

function Cart() {

  // const handleIncrement = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const handleDecrement = () => {
  //   setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  // };

    const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization" : localStorage.getItem("jwtToken")
        }
      };

    let {id} = useParams()
    id = Number(id)

    // const updateCart = async () => {
    //   console.log(5, quantity)
    //   let response = await axios.patch(
    //     `http://localhost:8080/update_cart/`,
    //     {
    //       "count" : `${quantity}`
    //     },
    //     config
    //   );
    //   if (response.status === 200) {
    //     console.log(2, response.data[0]);
    //   }
    // }


    let [cart, setCart] = useState([]);

    let dispatch = useDispatch();

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
        }
      }

    const deleteCart = async () => {
      let response = await axios.delete(
        `http://localhost:8080/delete_cart/`,
        config
      );
      if (response.status === 200) {
        console.log(2, response.data[0]);
      }
  }

    
    return (
        <div>
            {
              <CartBody cart={cart}></CartBody>
            }
            <div>
        </div>
        <button onClick={getCart}>버튼</button>
        <button onClick={deleteCart}>삭제 버튼</button>
        </div>
    )
}

function CartBody(props) {

  let [quantity, setQuantity] = useState(1);

  let dispatch = useDispatch();
  const stock = useSelector((state) => state.stock)

  useEffect(() => {
    console.log(quantity)
  }, [quantity]);

  const handleButtonClick = (e, id) => {
    dispatch(addCount(id)); 
    setQuantity(e)
    // console.log()
  };

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
                  stock.map((body, index) => (
                    <div className='cart_body'>
                      <div id={index} className='cart_real'>{body.name}</div>
                      <div id={index} className='cart_real'>{ body.price }</div> 
                      {/* 나중에 할인값 불러와야함(스프링에서 처리) */}
                      <div id={index} className='cart_real'>{body.picture}</div>
                      <div className="flex" style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', width:'300px'}}>
                          <h6>수량</h6>
                          <input
                            type="number"
                            value={body.count}
                            min='0'
                            // onChange={(e) => setQuantity(Number(e.target.value))}
                            onChange={(e) => dispatch(addCount(body.id, body.count)) 
                            }
                            // setQuantity(quantity => ({ ...quantity, "count" : `${e.target.value}` }));
                          />
                        </div>
                      </div>
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