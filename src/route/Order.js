import { useState } from 'react';
import './style/Order.scss'
import React from 'react'


function order() {
    const dummyOrders = [
      {
        id: 1,
        date: '2023-08-07',
        products: [
            { id: 1, name: '상품 1', price: 10000 },
            { id: 2, name: '상품 2', price: 20000 },
        ],
      },
    ];
    return (
        <div className='Order'>
          <div className='header'>
            <h1>주문 내역</h1>
          </div>
          <div className='orderbody'>
            {/* 주문 목록 표시 */}
            <ul>
              {dummyOrders.map(order => (
                <li key={order.id}>
                  <div>ID: {order.id}</div>
                  <div>날짜: {order.date}</div>
                  <div>제품 목록:</div>
                  <ul>
                    {order.products.map(product => (
                      <li key={product.id}>{product.name} - {product.price}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
export default order


