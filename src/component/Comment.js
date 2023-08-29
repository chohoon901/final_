import React, { useEffect, useState } from 'react'
import './style/Comment.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';



function Comment(props) {

    // let server = useSelector((state) => {
    //     return state
    // })

    const jwtToken = localStorage.getItem('jwtToken');
  
    let naviagete = useNavigate();

    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
      if (jwtToken) {
        try {
          const decoded = jwtDecode(jwtToken);
          setDecodedToken(decoded);
          console.log('Decoded Token:', decoded.id);
        } catch (error) {
          console.error('올바른 토큰이 아닙니다', error);
        }
      } else {
        alert('로그인 해주세요!');
        naviagete("/login");
      }
    }, []);

    const [user, setUser] = useState({
      id: decodedToken ? decodedToken.id : '',
      username: decodedToken ? decodedToken.username : ''
    });

    useEffect(() => {
      if (decodedToken) {
        setComment(prevUser => ({
          ...prevUser,
          "memberId": decodedToken.id
        }));
      }
    }, [decodedToken]);

    // -----------------------------

    let [comment, setComment] = useState({ 
      "memberId" : decodedToken ? decodedToken.id : '',
      "body" : ""
    });

    

    const saveComment = (event) => {
      setComment(comment => ({ ...comment, "body" : `${event.target.value}` }));
    };

    const config = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization" : localStorage.getItem("jwtToken")
      }
    };

    const requestComment = async (request, callback) => {
        console.log(1, request);
        let response = await axios.post(
          `/api4/create_comment/${props.id}`,
          JSON.stringify(request),
          config
        );
        if (response.status === 200) {
          console.log(2, response.headers.Authorization);

          if (callback) {
            callback();
          }
        }
      }

      let [comments, setComments] = useState([]);

      const getComments = async () => {
        let response = await axios.get(
          `/api4/show_comments/${props.id}`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data);
          const extractedBodies = response.data.map(item => item.body);
          setComments(extractedBodies);
        }
      }

      useEffect(() => {
        getComments();
      }, []); 

  return (
    <div className='comment'>
      <div className='comment_input'>
          <h2>댓글작성</h2>
          <input 
          placeholder='댓글을 작성해주세요' 
          style={{ width: '55%', textAlign: 'left', padding: '10px', marginRight: '10px' }}
          onChange={saveComment}></input>
          <button className='buttonDetail' onClick={() => requestComment(comment, getComments)}>작성</button>
      </div>
      <div className='comment_header'>
        {/* <button onClick={getComments}>조회</button> */}
        <CommentBody id={props.id} comments={comments}></CommentBody>
      </div>
    </div>
  )
}

function CommentBody(props) {

  return (
      <div className='container_comment'>
        {
          props.comments.map((body, index) => (
            <div className='comment_body'>
              <h3 style={{ alignItems: "center" }}>{index + 1}</h3>
              <div id={index} className='comment_real'>{body}</div>
            </div> 
          ))
        }
        {/* <button onClick={getComments}>버튼</button> */}
      </div>
  )
}

export default Comment