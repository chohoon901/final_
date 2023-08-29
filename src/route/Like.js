import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from 'react';
import './style/Like.scss'
import axios from "axios";
import Button from '../component/Button';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { setIsExist } from "../store";

function Like() {

    let dispatch = useDispatch();

    const isExist = useSelector((state) => state.isExist)

    const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization" : localStorage.getItem("jwtToken")
        }
      };

    let [like, setLike] = useState([]);

    const getLike = async (decoded) => {
      console.log(22, decoded)
        let response = await axios.get(
          `/api4/select_mylike?memberId=${encodeURIComponent(decoded.id)}`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data);
          if(response.data.length == 0) {
            dispatch(setIsExist(false))
          } else {
            dispatch(setIsExist(true))
          }
          setLike(response.data);
        }
    }

    useEffect(() => {
      const jwtToken = localStorage.getItem('jwtToken');
      const decoded = jwtDecode(jwtToken);
      getLike(decoded)
      // console.log(orders)
    }, []);

    // const deleteLike = async () => {
    //     let response = await axios.delete(
    //       `http://localhost:8080/delete_mylike/${id}`,
    //       config
    //     );
    //     if (response.status === 200) {
    //       console.log(response.data[0]);
    //     }
    // }

    // deleteLike={deleteLike
    
    return (
        <div className='myLike'>
            <div className='header'>
              <h1>찜한 상품 (0)</h1>
            </div>
            <div className='likebody'>
                {
                    isExist == true
                    ? <div>
                        <div>
                        <LikeProduct like={like} setLike={setLike}></LikeProduct>
                      </div>
                      </div>
                    : <div> 찜한 상품이 존재하지 않습니다 </div>
                }
            </div>
        </div>
    )
}



function LikeProduct(props) {

    const jwtToken = localStorage.getItem('jwtToken');
    const decoded = jwtDecode(jwtToken);

  const config = {
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": localStorage.getItem("jwtToken")
    }
};

  const deleteLike = async (id, callback) => {
    let response = await axios.delete(
      `/api4/delete_mylike/?id=${encodeURIComponent(id)}`,
      config
    );
    if (response.status === 200) {
      console.log(response.data[0]);
      if (callback) {
        callback()
      }
    }
  }

  let dispatch = useDispatch();

  const getLike = async (decoded) => {
    console.log(22, decoded)
      let response = await axios.get(
        `/api4/select_mylike?memberId=${encodeURIComponent(decoded.id)}`,
        config
      );
      if (response.status === 200) {
        console.log(2, response.data);
        if(response.data.length == 0) {
          dispatch(setIsExist(false))
        } else {
          dispatch(setIsExist(true))
        }
        props.setLike(response.data);
      }
  }

  const cartLike = async (id) => {
    let response = await axios.post(
      `/api4/post_mylike_to_cart/`,
      { id },
      config
    );
    if (response.status === 200) {
      console.log(response.data[0]);
      alert("상품이 장바구니에 담겼습니다!")
    }
}
    // console.log(props.like)

    // const addCart = async () => {
    //     let response = await axios.post(
    //       `http://localhost:8080/create_cart/${id}`,
    //       {
  
    //       },
    //       config
    //     );
    //     if (response.status === 200) {
    //       console.log(2, response.headers.Authorization);
    //     }
    //   };

    return (
        <div>
        {
          props.like.map((body, index) => (
            <div className='like_body'>
                {/* {console.log(body)} */}
              <div id={index} style={{ display: 'none' }}>{body.id}</div>
              <div id={index} className='like_real'>{body.name}</div>
              <h5 id={index} className='like_real'>{ `${(body.price * (1 - body.disc)).toLocaleString('ko-KR')}₩` }</h5>
              {/* <div id={index} className='like_real'>{body.picture}</div> */}
              <img id={index} src={body.picture} className='like_real'></img>
              <div className='button_container'>
              <button onClick={() => cartLike(body.id)}>장바구니</button>
              <button onClick={() => deleteLike(body.id, ()=> {getLike(decoded)})}>삭제</button>
              </div>
            </div>
          ))
        }
        </div>
    )
}

export default Like;