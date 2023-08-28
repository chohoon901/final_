import { useParams } from "react-router";
import './style/Detail.scss'
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { data } from "../data";
import moment from 'moment';

import calculateTimeRemaining from "./calculateTimeRemaining";
import Comment from "../component/Comment";
import CountDownView from "./CountDownView";
import axios from "axios";

function Detail() {

  let [isOpen, setIsOpen] = useState(false)

  const targetDate = new Date('2023-08-31T17:00:00');

  // let [quantity, setQuantity] = useState({
  //   "count" : 1
  // });
  
  let [quantity, setQuantity] = useState(1);
  // setQuantity(quantity => ({ ...quantity, "count" : `${event.target.value}` }));

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };
  

  let {id} = useParams()
  id = Number(id)
  

  
  let [product1, setProduct1] = useState(data)
  let [product, setProduct] = useState({})

  const getProduct = async () => {
    let response = await axios.get(
      `http://localhost:8080/get_product/${id}`,
      config
    );
    if (response.status === 200) {
      console.log(3, response.data);
      setProduct(response.data)
      console.log(4, product);
    }
  }

  const postCart = async () => {
    console.log(5, quantity)
    try {
      let response = await axios.post(
      `http://localhost:8080/create_cart/${id}`,
      {
        "count" : `${quantity}`
      },
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
      // window.location.href="/cart"
      alert("물건이 추가되었습니다!");
    }
  } catch (error) {
    if(error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      alert(errorMessage);
    } else {
      console.log('Another error occurred:', error.message);
    }
    window.location.reload();
  }
  };

  let [isLike, setIsLike] = useState(false)

  useEffect(() => {
    // product.liked 값이 변경되었을 때만 isLike 값을 업데이트
    setIsLike(product.liked);
  }, [product.liked]);

  const updatedIsLike = !isLike;

  const addLike = async () => {
    let response = ""
    console.log(232323, isLike)
    if (isLike === false) {
      response = await axios.post(
        `http://localhost:8080/create_mylike/${id}`,
        {

        },
        config
      );
      if (response.status === 200) {
        console.log(2, response.headers.Authorization);
        alert("찜 목록에 저장되었습니다!")
        setIsLike(updatedIsLike)
      }
    } else {
      response = await axios.delete(
        `http://localhost:8080/delete_detail_mylike/${id}`,
        {

        },
        config
      );
      if (response.status === 200) {
        console.log(2, response.headers.Authorization);
        alert("찜 목록에서 제거되었습니다.")
        setIsLike(updatedIsLike)
      }
    }
  };

  useEffect(() => {
    getProduct()
  }, []); 

  return (
    <div className="flex-container">
      <div className="flex-item">
      <div className="container">
          <div className="row">
            <div className="col-md-5">
              <img src={process.env.PUBLIC_URL + '/img/fan.jpg'} className="pt-5"></img>
            </div>
            <div className="col-md-6 left-align">
              <h3 className="pt-5">{product.name}</h3>
              <p>{product.comment_count}</p>
              {/* <If data={data}></If> */}
              <h5 className="strikethrough-text">{Number(product.price).toLocaleString('ko-KR')}\</h5>
              <h4>{
                (Number(product.price) * Number(product.disc)).toLocaleString('ko-KR')
              }\</h4>
              <hr className="line-divider"/>
              <h6>배송정보</h6>
              <div className="flex">
                  <h5 className="bold-marginright">- 당일 배송</h5>
                  <CountDownView targetDate={targetDate}></CountDownView>
                  <h6>(서울 경기 기준)</h6>
              </div>
              <h6 style={{ marginTop: '10px' }}>배송비</h6>
              <div className="flex">
                  <h5>- 2500원</h5>
              </div>
              <hr className="line-divider"/>
              <div className="flex" style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', width:'300px'}}>
                    <h6>수량</h6>
                    <input
                      type="number"
                      value={quantity}
                      min='0'
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      // setQuantity(quantity => ({ ...quantity, "count" : `${e.target.value}` }));
                    />
                  </div>
              </div>
              <hr className="line-divider"/>
              <div className="flex" style={{ marginBottom: '10px' }}>
                  <h6 style={{ marginRight: '15px' }}>가격</h6>
                  <h6>{ (Number(product.price) * Number(product.disc) * quantity).toLocaleString('ko-KR') }\</h6>
              </div>
              <button onClick={postCart} className="btn btn-light no-radius" style={{ marginRight: '10px' }}>장바구니</button> 
              <button className="btn btn-info no-radius" onClick={() => {
                window.location.href="/pay"
              }}>구매하기</button> 
              
            </div>
            <div className="col-md-1">
            <button onClick={addLike} className="pt-5" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              {
                isLike 
                ? <img src={process.env.PUBLIC_URL + '/img/colorheart.png'} alt="Like" /> 
                : <img src={process.env.PUBLIC_URL + '/img/like.png'} alt="Like" />   // 찜 안했을때(기본값)
              }
            </button>
            </div>
          </div>
          <div></div>
      </div>
      </div>
      <div className="flex-item">
        <Comment id={id}></Comment>
      </div>
    </div>
  )  
}

export default Detail; 