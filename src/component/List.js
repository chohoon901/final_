import React, { useState, useEffect } from 'react'
import './style/List.scss'
import { Nav, Pagination } from 'react-bootstrap'
import axios from "axios";

function List(props) {

    let [tab, setTab] = useState(0)

    // const [mainData, setMainData] = useState([]);
    // const [subData, setSubData] = useState([]);

    // useEffect(() => {
    //     bestMain();
    //     bestSub();
    // }, []);

    return (
      <div className='row'>
        <div className='listTitle'>
            <h2>{ props.title }</h2>
        </div>
        <Nav variant="underline" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={(mainsub) => { setTab(0) }}>
              높은 가격순
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={(mainsub) => { setTab(1) }}>
              낮은 가격순
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}></TabContent>
      </div>
    )
}



function TabContent({tab}) {



  const [activePage, setActivePage] = useState(1); // 활성화된 페이지 상태

  // 페이지 번호 클릭 시 활성화 페이지를 변경하는 함수
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  let items = [];
  for (let number = 1; number <= 8; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePageClick(number)} // 페이지 클릭 이벤트 처리
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className="pagination">
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );

    return (
      <div>
        <ProductList />
        <hr className="gray-line" />
        <ProductList />
      <div>{paginationBasic}</div>
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

function mainsub() {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };
  

    const bestMain = async () => {
        let response = await axios.post(
          `http://localhost:8080/best_mainCategory/`,
          
          config
        );
        if (response.status === 200) {
          bestMain(response.data);
        }
      }
      
    const bestSub = async () => {
        let response = await axios.post(
          `http://localhost:8080/best_subCategory/`,
          
          config
        );
        if (response.status === 200) {
          bestSub(response.data);
        }
      }
}

export default List