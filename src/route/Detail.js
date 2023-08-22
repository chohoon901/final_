import { useParams } from "react-router";
import './style/Detail.scss'
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from 'axios';

function Detail() {

    let [isOpen, setIsOpen] = useState(false)
    const [quantity, setQuantity] = useState(1);

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
    const Detail = (props) => {
    const requestComment = async (request) => {
      console.log(1, request);
      let response = await axios.post(
        `http://localhost:8080/create_comment/${props.id}`,
        JSON.stringify(request),
        config
      );
      if (response.status === 200) {
        console.log(2, response.headers.Authorization);
        window.location.reload();
      }
    };
  };

    let {id} = useParams()
    id = Number(id)

    return (
        <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img src={process.env.PUBLIC_URL + '/img/fan.jpg'} className="pt-5"></img>
              </div>
              <div className="col-md-6 left-align">
                <h3 className="pt-5">델루체 스탠드형 서큘레이터 DLF-C5110NK</h3>
                <p>381</p>
                {/* <If data={data}></If> */}
                <h5 className="strikethrough-text">45,000\</h5>
                <h4>39,860\</h4>
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
                <button onClick={Detail} className="btn btn-light no-radius" style={{ marginRight: '10px' }}>장바구니</button> 
                <button className="btn btn-info no-radius">구매하기</button> 
                
              </div>
              <div className="col-md-1">
                <img onClick={Detail} src={process.env.PUBLIC_URL + '/img/like.png'} className="pt-5"></img>
              </div>
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