import React, { useState, useEffect } from 'react'
import './style/List.scss'
import { Nav, Pagination } from 'react-bootstrap'
import axios from "axios";
import products from "../listTestData"
import dropdownItems from '../dropDownItems';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSlice, setSpecial } from '../store';


function List(props) {

  
  // const [mainData, setMainData] = useState([]);
  // const [subData, setSubData] = useState([]);
  
    // useEffect(() => {
      //     bestMain();
      //     bestSub();
    // }, []);

    const config = useSelector((state) => state.config)

    const special = useSelector((state) => state.special)

    let [tab, setTab] = useState(0)

    let dispatch = useDispatch();
    const dataSlice = useSelector((state) => state.dataSlice)

    const bestSub = async () => {
      let response = await axios.post(
        `http://localhost:8080/best_subCategory/`,
        special,
        config
      );
      if (response.status === 200) {
        console.log(response.data)
        dispatch(setDataSlice(response.data))
      }
    }

    useEffect(()=>{
      bestSub()
    }, [special])

    return (
      <div className='row'>
        <div className='listTitle'>
            <h2>{ props.title }</h2>
        </div>
        <Nav variant="underline" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => { setTab(0); dispatch(setSpecial({ ...special, sortBy: "price", sortDirection: "desc" })); }}>
              높은 가격순
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => { setTab(1); dispatch(setSpecial({ ...special, sortBy: "price", sortDirection: "asc" })); }}>
              낮은 가격순
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => { setTab(2); dispatch(setSpecial({ ...special, sortBy: "disc", sortDirection: "desc" })); }}>
              높은 할인순
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent special={special} dataSlice={dataSlice}></TabContent>
      </div>
    )
}



function TabContent({special, dataSlice}) {
  const [activePage, setActivePage] = useState(1); // 활성화된 페이지 상태
  let dispatch = useDispatch();
  // 페이지 번호 클릭 시 활성화 페이지를 변경하는 함수
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    const updatedSpecial = {
      ...special,
      pageNumber: pageNumber - 1
    };

    dispatch(setSpecial(updatedSpecial));
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
    <div className="pagination-container">
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

    return (
      <div>
        <div className='content'>
          <div className='row row-cols-4'>
            {
              dataSlice.map((body, index) => (
                <div className='col' onClick={() => {window.location.href=`/detail/${body.id}`}} key={index} style={{ cursor: 'pointer' }}>
                  <div className='product-item'>
                    <div style={{ display: 'none' }}>{body.id}</div>
                    <img src={body.picture} alt={body.name} style={{ width: '200px', height: '200px' }} />
                    <h5 className='discount-price'>{truncate(body.name, 60)}</h5>
                    <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                      <p className={body.disc === 0 ? "discount-price" : "original-price"}>{`${body.price.toLocaleString('ko-KR')}₩`}</p>
                      <h5 className='discount-price'>{ body.disc === 0 ? "" : `${Math.floor(body.disc*100)}% >> ${Math.floor(body.price * (1 - body.disc)).toLocaleString('ko-KR')}₩`}</h5>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <hr className="gray-line" />
        <div>{paginationBasic}</div>
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