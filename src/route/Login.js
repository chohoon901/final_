import React, { useState } from 'react';
import './style/Login.scss';
import { BrowserRouter as Router, Switch, Route, useNavigate, Link, Routes } from 'react-router-dom';
import Button from '../component/Button.jsx';
import { Row, Col, Container } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Axios from "axios";


export default function Login () {

  const [idpw, setIdpw] = useState({ 
    "username" : "",
    "password" : "" 
  });
  const saveUserId = event => {
    setIdpw(idpw => ({ ...idpw, "username" : `${event.target.value}` }));
    // console.log(idpw);
  };

  const saveUserPw = event => {
    setIdpw(idpw => ({ ...idpw, "password" : `${event.target.value}` }));
    // console.log(idpw);
  };

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const responseLogin = async (response) => {
    console.log(1, response);
    let jwtToken = await Axios.post(
      "http://localhost:8080/login",
      JSON.stringify(response),
      config
    );
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.headers.authorization);
      localStorage.setItem("jwtToken", jwtToken.headers.authorization);
    }
  }
  
  const responseGoogle = async (response) => {
    console.log(1, response);
    let jwtToken = await Axios.post(
      "http://localhost:8080/oauth/jwt/google",
      JSON.stringify(response),
      config
    );
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.data);
      localStorage.setItem("jwtToken", jwtToken.data);
    }
  };

return (
    <section className='loginform'>
      <h1>로그인</h1>
      <section className='loginform_container'>
          <div className='loginform_container_inputForm'>
            <input
              type="text"
              name="id"
              className='input'
              placeholder="아이디를 입력해 주세요"
              onChange={saveUserId}
            />
            <input
              type="password"
              name="password"
              className='input'
              placeholder="비밀번호를 입력해 주세요"
              onChange={saveUserPw}
            />
          </div>
          
          <section className='loginform_container_buttonSection'>
            <Button
              type="submit"
              name="로그인"
              form="login"
              className='loginButton'
              isPurple={true}
              onClick={()=>{ responseLogin(idpw) }}
            />
            <Button name="회원가입" />

            <div style={{display:"inline"}}>
                  <GoogleOAuthProvider clientId="261022339381-6ak2592qv7h3jotr3dq7ajt59j5qfdt7.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        var decoded = jwt_decode(credentialResponse.credential);
                        console.log(JSON.stringify(decoded));
                        responseGoogle(decoded);
                      }
                      }
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </GoogleOAuthProvider>
                  <img src={process.env.PUBLIC_URL + '/img/naver1.png'}
                    alt="Naver Logo"
                    className='logoImage'  style={{display:"inline", margin:"10px"}} />
                  <img src={process.env.PUBLIC_URL + '/img/kakao.png'}
                    alt="Kakao Logo"
                    className='logoImage' style={{display:"inline", margin:"10px"}} />
            </div>
          </section>
      </section>
    </section>
  );
}