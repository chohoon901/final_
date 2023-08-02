import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useNavigate, Link } from 'react-router-dom';
import './App.scss';
import axios from 'axios';

function App() {

  let navigate = useNavigate()

  return (
    <div className="App">
      <header className='navbar'>
        <section className='login'>
          <Link to="/signup">회원가입</Link>
          <Link to="/login">로그인</Link>
        </section>
        <Container>
          <Navbar.Brand href="#home">SummerMart</Navbar.Brand>
          <input className='searchInput' type="text" placeholder="검색어를 입력해 주세요"></input>
          <Row>
            <Col>
              <img src={process.env.PUBLIC_URL + '/img/heart.png'}></img>
            </Col>
            <Col>
              <img src={process.env.PUBLIC_URL + '/img/cart.png'}></img>
            </Col>
            <Col>
              <img src={process.env.PUBLIC_URL + '/img/user.png'}></img>
            </Col>
          </Row>
        </Container>
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/')
            }} className='bar'>홈</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/detail/0')
            }} className='bar'>베스트</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/about')
            }} className='bar'>특가</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/about')
            }} className='bar'>여름이벤트</Nav.Link>
          </Nav>
          <div className='rank'>
            1. 펩시제로
            <img src={process.env.PUBLIC_URL + '/img/arrowdown.png'}></img>
          </div>
        </Container>
      </header>
    </div>
  );
}

export default App;
