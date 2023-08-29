import { useEffect, useState } from 'react';
import './style/Info.scss'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import jwtDecode from 'jwt-decode';


function Info() {
  
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
      setUser(prevUser => ({
        ...prevUser,
        id: decodedToken.id,
        username: decodedToken.username,
      }));
    }
  }, [decodedToken]);
  
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
      `/api4/compare_password`,
      {
        memberId: user.id,
        password: password
      },
      config
    );
     if (response.data === true) {
      console.log(2, response.data);
      setIsPasswordCorrect(true);
      history('/mypage/infoform');
     } else {
      setIsPasswordCorrect(false);
      alert("비밀번호가 틀렸습니다, 다시 시도해주세요.")
    }
  } catch (error) {

  }
};

useEffect(()=>{
  console.log(password)
},[password])

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