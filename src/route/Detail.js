import { useParams } from "react-router";
import './style/Detail.scss'
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { data } from "../data";
import moment from 'moment';

import Comment from "../component/Comment";
import axios from "axios";

function Detail() {

    let [product, setProduct] = useState(data)

    let [isOpen, setIsOpen] = useState(false)
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    let {id} = useParams()
    id = Number(id)

    const config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization" : localStorage.getItem("jwtToken")
      }
    };

    const getProduct = async () => {
      let response = await axios.get(
        `http://localhost:8080/show_product/${id}`,
        config
      );
      if (response.status === 200) {
        console.log(2, response.data[0]);
      }
    }

    // useEffect(() => {
    //   getProduct()
    // }, [])

    return (
      <div className="flex-container">
        <div className="flex-item">
        <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img src={process.env.PUBLIC_URL + '/img/fan.jpg'} className="pt-5"></img>
              </div>
              <div className="col-md-6 left-align">
                <h3 className="pt-5">{product[0].name}</h3>
                <p>{product[0].comment_count}</p>
                {/* <If data={data}></If> */}
                <h5 className="strikethrough-text">{product[0].price.toLocaleString('ko-KR')}\</h5>
                <h4>{
                  (product[0].price * product[0].disc).toLocaleString('ko-KR')
                }\</h4>
                <hr className="line-divider"/>
                <h6>배송정보</h6>
                <div className="flex">
                    <h5 className="bold-marginright">- 오늘출발</h5>
                    <h6 className="marginright"> 16 : 11 뒤 마감 </h6>
                    <h6>(서울 경기 기준)</h6>
                </div>
                <h6 style={{ marginTop: '10px' }}>배송비</h6>
                <div className="flex">
                    <h5>- 2500원</h5>
                </div>
                <hr className="line-divider"/>
                <h6>제품선택</h6>
                <DropdownButton variant="secondary" title="옵션을 선택해주세요 ">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                <div className="flex" style={{ marginTop: '20px' }}>
                    
                    <div style={{ display: 'flex', width:'300px'}}>
                      <h6>수량</h6>
                      <input
                        type="number"
                        value={quantity}
                        min='0'
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                    </div>
                </div>
                <hr className="line-divider"/>
                <div className="flex" style={{ marginBottom: '10px' }}>
                    <h6 style={{ marginRight: '15px' }}>가격</h6>
                    <h6>19,990\</h6>
                </div>
                <button className="btn btn-light no-radius" style={{ marginRight: '10px' }}>장바구니</button> 
                <button className="btn btn-info no-radius" onClick={() => {
                  window.location.href="/pay"
                }}>구매하기</button> 
                
              </div>
              <div className="col-md-1">
                <img src={process.env.PUBLIC_URL + '/img/like.png'} className="pt-5"></img>
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

// function If(props) {
//     if (props.data.nPrice) {
//         return (
//             <h5>{props.data.nPrice}</h5>
//         )
//     } else {
//         return null
//     }
// }

export default Detail; 