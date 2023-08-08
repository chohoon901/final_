import React from 'react';
import './style/Login.scss';
import { BrowserRouter as Router, Switch, Route, useNavigate, Link, Routes } from 'react-router-dom';
import Button from '../component/Button.jsx';
import { Row, Col, Container } from 'react-bootstrap';

export default function Login () {

return (
    <section className='loginform'>
      <h1>로그인</h1>
      <section className='loginform_container'>
          <div className='loginform_container_inputForm'>
            <input
              type="text"
              name="email"
              className='input'
              placeholder="이메일을 입력해 주세요"
            />
            <input
              type="password"
              name="password"
              className='input'
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
          
          <section className='loginform_container_buttonSection'>
            <Button
              type="submit"
              name="로그인"
              form="login"
              className='loginButton'
              isPurple={true}
            />
            <Button name="회원가입" />

            <div style={{display:"inline"}}>
             {/*  
              <Row>
              <Col>
                <div style={{width:"150px"}}>
                  <div className="img-container" >
                  */}
                  <img src={process.env.PUBLIC_URL + '/img/naver1.png'}
                    alt="Naver Logo"
                    className='logoImage'  style={{display:"inline", margin:"10px"}} />
                {/*    
                  </div>
                </div>
                <div className='logo'>
                  <div className='img-container'>
                  */}
                  <img src={process.env.PUBLIC_URL + '/img/kakao.png'}
                    alt="Kakao Logo"
                    className='logoImage' style={{display:"inline", margin:"10px"}} />
                  {/*
                  </div>
                </div>
                </Col>
              </Row>
                  */}
            </div>  
          </section>
      </section>
    </section>
  );
}