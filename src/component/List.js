import React, { useState } from 'react'
import './style/List.scss'
import { Nav, Pagination } from 'react-bootstrap'

function List(props) {

    let [tab, setTab] = useState(0)

    return (
      <div className='row'>
        <div className='listTitle'>
            <h2>{ props.title }</h2>
        </div>
        <Nav variant="underline" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}>
              높은 가격순
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}>
              낮은 가격순
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}></TabContent>
      </div>
    )
}

function TabContent({tab}) {
    return (
      <div>
        <ProductList />
        <hr className="gray-line" />
        <ProductList />
      </div>
      
  );
}

function ProductList() {
  return (
    <div className='content'>
    <div className='row row-cols-4'>
      <div className='col'>
        <div className='product-item'>
          <img src='http://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2b3a/e1f41dc2a98e8257365f7dec7c9028aa64e5f6d7af34528cb7e5d5a6805e.jpg' alt='Product 1' style={{ width: '200px', height: '200px' }} />
          <h5>신일 산업용제습기</h5>
          <p className='original-price'>가격: 699000원</p>
          <p className='discount-price'>할인 가격: 원</p>
        </div>
      </div>
      <div className='col'>
        <div className='product-item'>
          <img src='http://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/46e3/ae7faa474e37f464ddfd8cec8e52b63678f8911c50f06051891af4656eed.jpg' alt='Product 2' style={{ width: '200px', height: '200px' }} />
          <h5>템피아 대형제습기</h5>
          <p className='original-price'>가격: 738000원</p>
          <p className='discount-price'>할인 가격: 원</p>
        </div>
      </div>
      <div className='col'>
        <div className='product-item'>
          <img src='http://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2b3a/e1f41dc2a98e8257365f7dec7c9028aa64e5f6d7af34528cb7e5d5a6805e.jpg' alt='Product 3' style={{ width: '200px', height: '200px' }} />
          <h5>신일 산업용제습기</h5>
          <p className='original-price'>가격: 1390900원</p>
          <p className='discount-price'>할인 가격: 원</p>
        </div>
      </div>
      <div className='col'>
        <div className='product-item'>
          <img src='http://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/031e/6ee1aabb639961a532ebe0b3c44a1daf8c680554ff6e05952fe4668cd051.jpg' alt='Product 4' style={{ width: '200px', height: '200px' }} />
          <h5>단미 DA-APD01</h5>
          <p className='original-price'>가격: 18000원</p>
          <p className='discount-price'>할인 가격: 원</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default List