import './style/Cart.scss'
import { LiaPlusSolid, LiaEqualsSolid } from "react-icons/lia"
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount, setCount } from '../store';
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

function Cart() {

  // const handleIncrement = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const handleDecrement = () => {
  //   setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  // };

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

      useEffect(() => {
        getCart()
      }, []);

    
    return (
        <div>
            {
              <CartBody getCart={getCart}></CartBody>
            }
          <button onClick={getCart}>버튼</button>
        </div>
    )
}



// --------------------------------------------------------





function CartBody(props) {

  let [quantity, setQuantity] = useState(1);

  let [total_amount, setTotal_Amount] = useState(0);

  let dispatch = useDispatch();
  const stock = useSelector((state) => state.stock)
  const config = useSelector((state) => state.config)

  const deleteCart = async (params, callback) => {
    let response = await axios.delete(
      `http://localhost:8080/delete_cart?id=${params}`,
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
      if (callback) {
        callback();
      }
    }
  }

  
  const handleButtonClick = (e, id) => {
    dispatch(addCount(id)); 
    setQuantity(e)
    // console.log()
  };
  
  const calculateTotalAmount = () => {
    let sum = 0;
    for (let i = 0; i < stock.length; i++) {
      sum += stock[i].price * stock[i].count;
    }
    return sum;
  };

  let [stockName, setStockName] = useState("");

  let state = {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name:  `${stockName}외 ${stock.length}종`,
    item_code: "1",
    quantity: 1,
    total_amount: (total_amount + 2500) / 100,
    vat_amount: 0,
    tax_free_amount: 0,
    approval_url: "http://localhost:3000/payresult",
    fail_url: "http://localhost:3000/payresult?product=788&member=44&pay=fail",
    cancel_url: "http://localhost:3000/payresult?product=788&member=4&pay=cencel"
  }

  const kakaoConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      "Authorization" : "KakaoAK 77671de1f3b849ee736e816accdad58b"
    }
  };
  
  const pay = async (state) => {
    console.log(333333, state.item_code)
    
    let kakaoToken = await axios.post(
      "/api3/payment/ready",
      state,
      kakaoConfig
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

  const plusCountaxios = async (request) => {
    let response = await axios.patch(
      "http://localhost:8080/update_cart",
      {
        id: request,
        updown: 1
      },
      config
    );
  }

  const deleteCountaxios = async (request) => {
    let response = await axios.patch(
      "http://localhost:8080/update_cart",
      {
        id: request,
        updown: 0
      },
      config
    );
  }

  let newCode = ""

  useEffect(() => {
    if (stock.length > 0) {
      setStockName(stock[0].name);
    }
  }, []);

  useEffect(() => {
    console.log(quantity)
  }, [quantity]);

  useEffect(() => {
    const newTotalAmount = calculateTotalAmount();
    setTotal_Amount(newTotalAmount);
  }, [stock]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleIncrement = (id) => {
    dispatch(addCount(id));
    plusCountaxios(id)
  };

  const handleDecrement = (id) => {
    dispatch(minusCount(id));
    deleteCountaxios(id)
  };

  return (
    <div className='container myCart'>
            <div className='header'>
                <h1>장바구니</h1>
            </div>
            <div>
                {
                  stock.map((body, index) => (
                    <div className='cart_body'>
                      <div style={{ display: 'none' }}>{body.id}</div>
                      <div id={index} className='cart_real'>{truncate(body.name, 30)}</div>
                      <div id={index} className='cart_real'>{ body.price }</div> 
                      {/* 나중에 할인값 불러와야함(스프링에서 처리) */}
                      {/* <div id={index} className='cart_real'>{body.picture}</div> */}
                      <img src={body.picture} id={index} className='cart_real'></img>
                      <div className="cart_real">
                        <div style={{ display: 'flex', justifyContent: "center",width:'300px'}}>
                          <h6>수량</h6>
                          <input
                            type="number"
                            value={body.count}
                            min='0'
                            // setQuantity(quantity => ({ ...quantity, "count" : `${e.target.value}` }));
                          />
                          <button onClick={()=>{ handleIncrement(body.id) }}>
                            <BiUpArrow></BiUpArrow>
                          </button>
                          <button onClick={()=>{ handleDecrement(body.id) }}>
                            <BiDownArrow></BiDownArrow>
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'none' }}>
                        {
                          newCode += "," + String(body.productId)
                        }
                        {
                          state.item_code = newCode.substring(1)
                        }
                        {
                          console.log(stockName)
                        }
                      </div>
                      <div id={index} className='cart_real'>
                          <button className="delete_button" onClick={() => { deleteCart(body.id, props.getCart) }}>삭제</button>
                      </div>
                    </div>  
                  ))
                }
            </div>
            <div className='result px-5 py-5'>
                <h6>총 상품가격</h6>
                <h6>{total_amount}</h6>
                <h6>원</h6>
                <LiaPlusSolid></LiaPlusSolid>
                <h6>총 배송비</h6>
                <h6>2500</h6>
                <h6>원</h6>
                <LiaEqualsSolid></LiaEqualsSolid>
                <h6>총 주문금액</h6>
                <h6>{total_amount + 2500}</h6>
                <h6>원</h6>
            </div>
            <div className='quantity-container'>
              <button className="purchase-button" onClick={() => {pay(state)}}>구매하기</button>
              <button className="length-button" onClick={() => { stockName = stock[0].name}}>길이</button>
            </div>
    </div>
    )
}

export default Cart;