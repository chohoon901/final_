import React, { useState } from 'react';
import './style/Coupon.scss'
import React from 'react'
import { Nav } from 'react-bootstrap'
import React from 'react'

function Coupon(props) {

    let [tab, setTab] = useState(0)

  return (
    <div>Coupon</div>
  )
}

function TabContent({tab}) {
    return (
        <div className='content'>
            { [<div>보유 쿠폰</div>, <div>선물한 쿠폰</div>][tab]}
        </div>
    )
}

export default Coupon

