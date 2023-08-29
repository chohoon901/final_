import { useEffect, useState } from 'react';
import './style/Order.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cancelStatus, setOrders } from '../store';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';


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

    

    const getOrder = async (decoded) => {
      console.log(3333, decoded)
      let response = await axios.get(
        `/api4/find_Orderproducts?memberId=${encodeURIComponent(decoded.id)}`,
        config
      );
      if (response.status === 200) {
        dispatch(setOrders(response.data))
        setOrder(response.data);
      }
    }

    useEffect(() => {
      const jwtToken = localStorage.getItem('jwtToken');
      const decoded = jwtDecode(jwtToken);
      getOrder(decoded)
      // console.log(orders)
    }, []);

    useEffect(() => {
      console.log(orders)
    }, [orders]);

    let [delivery, setDelivery] = useState([])

    const jwtToken = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(jwtToken);

    const cancleOrder = async (orderId, callback) => {
      console.log(1, orderId);
      let response = await axios.patch(
        `/api4/updateStatus`,
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
        if(callback) {
          callback()
        }
      }
    }

    const handleCancel = (orderId) => {
      cancleOrder(orderId, () => {
        // 취소 함수 수행 후 주문 목록 업데이트
        dispatch(cancelStatus(orderId));
        // getOrder 함수를 호출하여 업데이트된 주문 목록 다시 가져오기
        getOrder(decoded);
      });
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


