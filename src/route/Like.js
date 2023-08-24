import { useParams } from "react-router";
import { useState } from 'react';
import './style/Like.scss'
import axios from "axios";

function Like() {

    let [isExist, setIsExist] = useState(true)

    const config = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization" : localStorage.getItem("jwtToken")
        }
      };
  
      let {id} = useParams()
      id = Number(id)


    let [like, setLike] = useState([]);

    const getLike = async () => {
        let response = await axios.get(
          `http://localhost:8080/select_mylike`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data);
          setLike(response.data);
        }
    }

    const deleteLike = async () => {
        let response = await axios.delete(
          `http://localhost:8080/delete_mylike/${id}`,
          config
        );
    }
    
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
                        <LikeProduct like={like}></LikeProduct>
                      </div>
                      <button onClick={getLike}>버튼</button>
                      </div>
                    : <div> 상품없다 </div>
                }
            </div>
        </div>
    )
}



function LikeProduct(props) {
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
              <div id={index} className='like_real'>{body.name}</div>
              <div id={index} className='like_real'>{ body.price * (1 - body.disc) }</div>
              <div id={index} className='like_real'>{body.picture}</div>
              <button>장바구니</button>
              <button>삭제</button>
            </div>
          ))
        }
        </div>
    )
}

export default Like;