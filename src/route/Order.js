import { useEffect, useState } from 'react';
import './style/Order.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cancelStatus, setOrders } from '../store';


function order() {
    return (
        <div className='Order'>
          <div className='header'>
            <h1>주문 내역</h1>
          </div>
          <Orderbody></Orderbody>
        </div>
      );
    }

function Orderbody() {
  
  let [order, setOrder] = useState([]);

  let dispatch = useDispatch();
  const orders = useSelector((state) => state.orders)
  const config = useSelector((state) => state.config)

  const getOrder = async () => {
      let response = await axios.get(
        `http://localhost:8080/find_Orderproducts/`,
        config
      );
      if (response.status === 200) {
        dispatch(setOrders(response.data))
        setOrder(response.data);
      }
    }

    useEffect(() => {
      getOrder()
      // console.log(orders)
    }, []);

    useEffect(() => {
      console.log(orders)
    }, [orders]);

    let [delivery, setDelivery] = useState([])

    const cancleOrder = async (orderId) => {
      console.log(1, orderId);
      let response = await axios.patch(
        `http://localhost:8080/updateStatus`,
        {
          "orderItemId": orderId
        },
        config
      );
      if (response.status === 200) {
        console.log(2, response.data);
        setDelivery(prevDelivery => prevDelivery.map((status, index) =>
          index === orderId ? false : status
        ));
      }
    }

    const handleCancel = (orderId) => {
      cancleOrder(orderId); // 주문 취소 처리 함수 호출
      // setOrders를 사용하여 주문 목록 업데이트
      dispatch(cancelStatus(orderId))
    };

  return (
    <div className='all_order'>
        {orders.map((order, index) => (
          <div className='orderbody' key={order.id}>
            <div className='eachorder'>
              <div >{order.id}번 상품</div>
              <div>
                <img src={order.picture}></img>
                {/* <img src={order.picture}></img> */}
              </div>
              <div style={{ width: '30%' }}>{order.name}</div>
              <div>{order.count}개</div>
              <div>{order.price * order.count}</div>
              <div>
                {order.orderStatus === "ORDER" ? <div>배송중</div> : <div>배송취소</div>}
                {/* <div>배송중</div> */}
              </div>
              <button disabled={order.orderStatus !== "ORDER"} onClick={()=>{handleCancel(order.id)}}>주문취소</button>
            </div>
          </div>
        ))}
    </div>
  )
}

// disabled={ order.orderStatus === "ORDER" ? "false" : "true" }
    
export default order


