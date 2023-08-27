import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect  } from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, useNavigate, Link, Routes } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import base64 from 'base-64';

import Detail from './route/Detail';
import MyPage from './component/MyPage';
import Cart from './route/Cart';
import Like from './route/Like';
import Best from './route/Best';
import Special from './route/Special';
import Order from './route/Order';
import Info from './route/Info';
import Login from './route/Login';
import Signup from './route/Signup';
import Footer from './component/Footer';
import Pay from './route/Pay';
import PayResult from './route/PayResult';
import Search from './route/Search';

import Mainbanner from './component/Mainbanner';
import { useDispatch, useSelector } from 'react-redux';
import { setChange, setInputValue, setSearch } from './store';

function App() {

  let dispatch = useDispatch();
  
  const inputValue = useSelector((state) => state.inputValue)
  const change = useSelector((state) => state.change)
  // let [inputValue, setInputValue] = useState("")

  const handleInputChange = (event) => {
    dispatch(setInputValue(event.target.value))
    console.log('Input Value:', inputValue);
  };

  let navigate = useNavigate()
  let [user, setUser] = useState(null);

  const config = {
    headers: {
      "Authorization": localStorage.getItem("jwtToken"),
    },
  };

  const checkAuthenication = async () => {
    let res = await axios.get("http://localhost:8080/member/test", config);
    setUser(res.data)
  }

  const checkToken = () => {
    let token = window.localStorage.getItem("jwtToken")
    let payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.')); 
    let dec = base64.decode(payload);
    console.log(dec)
  }

  const handleSubmit = () => {
    dispatch(setSearch(true))
    dispatch(setChange(change+1))
  };

  return (
    <div className="App">
      <header className='navbar'>
        <Container>
          <section className='login'>
            <Link to="/signup" className='mya'>회원가입</ Link>
            <Link to="/login" className='mya'>로그인</Link>
          </section>
        </Container>
        <Container>
          <Navbar.Brand href="#home">SummerMart</Navbar.Brand>
          <div className='searchContainer'>
          <input className='searchInput' value={inputValue} onChange={(e) => {handleInputChange(e)}} type="text" placeholder="검색어를 입력해 주세요"></input>
          <Link to={`/search/${inputValue}`} className="searchIcon">
            <img onClick={() => { handleSubmit() }} src={process.env.PUBLIC_URL + '/img/search.png'} alt="검색"></img>
          </Link>  
          </div>
          <Row>
            <Col>
              <Link to="/mypage/like">
                <img src={process.env.PUBLIC_URL + '/img/like.png'}></img>
              </Link>
            </Col>
            <Col>
              <Link to="/cart">
                <img src={process.env.PUBLIC_URL + '/img/cart.png'}></img>
              </Link>
            </Col>
            <Col>
              <Link to="/mypage">
                <img src={process.env.PUBLIC_URL + '/img/user.png'}></img>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/main')
            }} className='bar mya' >홈</Nav.Link>
            <Nav.Link onClick={() => {
              dispatch(setSearch(false))
              navigate('/special')
            }} className='bar mya'>특가</Nav.Link>
          </Nav>
          <div className='rank'>
            1. 펩시제로
            <img src={process.env.PUBLIC_URL + '/img/arrowdown.png'}></img>
          </div>
        </Container>
      </header>

      <Routes>
        <Route path="/main" element={
          <Mainbanner></Mainbanner>
        }></Route>
        <Route path="/pay" element={
          <Pay></Pay>
        }></Route>
        <Route path="/payresult" element={
          <PayResult></PayResult>
        }></Route>
        <Route path="/login" element={
          <Login></Login>
        }></Route>
        <Route path="/signup" element={
          <Signup></Signup>
        }></Route>
        <Route path="/special" element={
          <Special></Special>
        }></Route>
        <Route path="/search/:keyword" element={
          <Search></Search>
        }></Route>
        <Route path="/detail/:id/" element={
          <Detail></Detail>
        }></Route>
        <Route path="/cart" element={
          <Cart></Cart>
        }></Route>
        <Route path="/mypage" element={
          <MyPage></MyPage>
        }>
          <Route index element={<Order />} />
          <Route index element={<Order />} />
            <Route path="order" element={
              <Order></Order>
            }></Route>
            <Route path="like" element={
              <Like></Like>
            }></Route>
            <Route path="info" element={
              <Info></Info>
            }></Route>
        </Route>
      </Routes>

      <button onClick={checkToken}>
        인증정보
      </button>
      <h4>{user}</h4>

      <div className='images'>
        <div className='temporary'>
          <Link to={"/detail/" + 1}>
            {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
            {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
            <img style={{ height : '345px' }} src="http://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2b3a/  e1f41dc2a98e8257365f7dec7c9028aa64e5f6d7af34528cb7e5d5a6805e.jpg"></img>
          </Link>
        </div>
        <div className='temporary'>
          <Link to={"/detail/" + 2}>
            {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
            {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
            <img style={{ height : '345px' }} src="http://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/9af9/ 7696d838f96bd1415c820f4a2de00078e9c199bef10dfbf845ba6e685053.jpg"></img>
          </Link>
        </div>
        <div className='temporary'>
          <Link to={"/detail/" + 3}>
            {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
            {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
            <img style={{ height : '345px' }} src="http://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/9af9/ 7696d838f96bd1415c820f4a2de00078e9c199bef10dfbf845ba6e685053.jpg"></img>
          </Link>
        </div>
      </div>
      
        <div className="Footer">
      <Footer />
      </div>

    </div>
  );
}


export default App;
