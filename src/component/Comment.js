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

    const requestComment = async (request, callback) => {
        console.log(1, request);
        let response = await axios.post(
          `http://localhost:8080/create_comment/${props.id}`,
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
          `http://localhost:8080/select_comment/${props.id}`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data);
          const extractedBodies = response.data.map(item => item.body);
          setComments(extractedBodies);
        }
      }

      const deleteComment = async () => {
        let response = await axios.delete(
          `http://localhost:8080/delete_comment/`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data[0]);
        }
    }

      const patchComment = async () => {
        let response = await axios.patch(
          `http://localhost:8080//update_comment/`,
          config
        );
        if (response.status === 200) {
          console.log(2, response.data[0]);
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
          style={{ width: '70%', textAlign: 'left', padding: '10px' }}
          onChange={saveComment}></input>
          <button onClick={() => requestComment(comment, getComments)}>작성</button>
          <button onClick={deleteComment}>삭제</button>
          <button onClick={patchComment}>수정</button>
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