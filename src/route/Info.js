import { useState } from 'react';
import './style/Info.scss'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function Info() {
  
  
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };
  
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const passwordCorrection = async () => {
    try {
    const response = await axios.post(
      `http://localhost:8080/compare_password`,
      { password },
      config
    );
     if (response.status === 200 && response.data.isPasswordCorrect) {
      setIsPasswordCorrect(true);
      // console.log(2, response.headers.Authorization);
      history('/infoform');
     } else {
      setIsPasswordCorrect(false);
      alert("비밀번호가 틀렸습니다, 다시 시도해주세요.")
    }
  } catch (error) {

  }
};

  return (
    <div className='myinfo'>
      <div className='header'>
        <h1>개인 정보 수정</h1>
      </div>
      <div>
        <h4>비밀번호 재확인</h4>
        <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
      </div>
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해 주세요"
        className='input'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn' onClick={passwordCorrection}>
        확인
      </button>
      {!isPasswordCorrect && (
        <div>
          <p>비밀번호가 올바르지 않습니다. 다시 시도해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default Info;