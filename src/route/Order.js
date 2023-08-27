import { useEffect, useState } from 'react';
import './style/Order.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setOrders } from '../store';


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
  const dummyOrders = [
    {
      id: 1, // orderprouctId
      name: '상품 1', 
      price: 10000,
      picture: "사진",
      count: 2
    },
  ];

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

  return (
    <div>
        {orders.map((order, index) => (
          <div className='orderbody' key={order.id}>
            <div className='eachorder'>
              <div>{order.id}번 상품</div>
              <div>
                <img src="http://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/9af9/  7696d838f96bd1415c820f4a2de00078e9c199bef10dfbf845ba6e685053.jpg"></img>
                {/* <img src={order.picture}></img> */}
              </div>
              <div>{order.name}</div>
              <div>{order.count}개</div>
              <div>{order.price * order.count}</div>
              <div>배송중</div>
              <button>주문취소</button>
            </div>
          </div>
        ))}
    </div>
  )
}
    
export default order


