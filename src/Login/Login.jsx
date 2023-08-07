import React from 'react';
import style from './Login.module.scss';
import { BrowserRouter as Router, Switch, Route, useNavigate, Link, Routes } from 'react-router-dom';
import Button from './Button.jsx';
import { Row, Col, Container } from 'react-bootstrap';

export default function Login () {

return (
    <section className={style.login}>
      <h1>로그인</h1>
      <section className={style.login_container}>
          <input
            type="text"
            name="email"
            className={style.input}
            placeholder="이메일을 입력해 주세요"
          />
          <input
            type="password"
            name="password"
            className={style.input}
            placeholder="비밀번호를 입력해 주세요"
          />
          <section className={style.login_container_buttonSection}>
            <Button
              type="submit"
              name="로그인"
              form="login"
              className={style.loginButton}
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
                  className={style.logoImage}  style={{display:"inline", margin:"10px"}} />
              {/*    
                </div>
              </div>
              <div className='logo'>
                <div className='img-container'>
                */}
                <img src={process.env.PUBLIC_URL + '/img/kakao.png'}
                  alt="Kakao Logo"
                  className={style.logoImage} style={{display:"inline", margin:"10px"}} />
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
