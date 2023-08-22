import React, { useEffect, useState } from 'react'
import './style/Comment.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';

function Comment(props) {

    // let server = useSelector((state) => {
    //     return state
    // })
    let [comment, setComment] = useState({ 
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
      }

      let [comments, setComments] = useState([]);

      const getComments = async () => {
        let response = await axios.get(
          `http://localhost:8080/select_comment/${props.id}`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data[0].body);
          
          // comments = response.data.body;
          // window.location.reload();
          console.log(2, response.data[0]);
          const extractedBodies = response.data.map(item => item.body);
          setComments(extractedBodies);
        }
      }

      const handleButtonClick = (comment) => {
        requestComment(comment);
        getComments();
      };

  return (
    <div className='comment'>
      <div className='comment_input'>
          <h2>댓글작성</h2>
          <input 
          placeholder='댓글을 작성해주세요' 
          style={{ width: '70%', textAlign: 'left', padding: '10px' }}
          onChange={saveComment}></input>
          <button onClick={() => handleButtonClick(comment)}>작성</button>
      </div>
      <div className='comment_header'>
        <CommentBody id={props.id}></CommentBody>
      </div>
    </div>
  )
}

function CommentBody(props) {

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": localStorage.getItem("jwtToken")
    }
  }

  let [comments, setComments] = useState([]);

  const getComments = async () => {
    let response = await axios.get(
      `http://localhost:8080/select_comment/${props.id}`,
    //   "http://localhost:8080/login", 
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
      const extractedBodies = response.data.map(item => item.body);
      setComments(extractedBodies);
      // comments = response.data.body
      // window.location.reload();
    }
  }
  return (
      <div className='container_comment'>
        {
          comments.map((body, index) => (
            <div className='comment_body'>
              <h3 style={{ alignItems: "center" }}>{index}</h3>
              <div id={index} className='comment_real'>{body}</div>
            </div> 
          ))
        }
        <button onClick={getComments}>버튼</button>
      </div>
    
  )

  // props.comments.map((a, i) => {
  //   return (
  //     <div className='comment_body'>
  //       <h3 style={{ alignItems: "center" }}>1</h3>
  //       <div className='comment_real'>댓글</div>
  //       <button onClick={()=>getComments}>버튼</button>
  //     </div>
  //   )
  // })
  
}

export default Comment