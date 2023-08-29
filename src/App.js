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
import InfoForm from './route/InfoForm';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 상태 확인
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    // 로그아웃 로직 처리 후 로컬 스토리지에서 토큰 삭제 및 로그인 상태 변경
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate("/main")
  };

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

  const handleSubmit2 = (e) => {
    if (e) {
      e.preventDefault(); // 이벤트 전파 중지
    }
    dispatch(setSearch(true))
    dispatch(setChange(change+1))
    navigate(`/search/${inputValue}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit2(e);
    }
  };

  const handleLinkClick = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      navigate("/mypage/order");
    } else {
      alert("로그인 하셔야 합니다!");
      navigate("/login");
    }
  };

  const handleHeartClick = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      navigate("/mypage/like");
    } else {
      alert("로그인 하셔야 합니다!");
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      navigate("/cart");
    } else {
      alert("로그인 하셔야 합니다!");
      navigate("/login");
    }
  };

  return (
    <div className="App">
      <header className='navbar'>
        <Container>
        <section className='login'>
            {isLoggedIn ? (
              <div onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</div>
            ) : (
              <>
                <Link to="/signup" className='mya'>회원가입</Link>
                <Link to="/login" className='mya'>로그인</Link>
              </>
            )}
          </section>
        </Container>
        <Container>
          <Navbar.Brand href="#home">SummerMart</Navbar.Brand>
          <div className='searchContainer'>
          <input className='searchInput' value={inputValue} onChange={(e) => {handleInputChange(e)}} type="text" placeholder="검색어를 입력해 주세요" onKeyDown={(e) => {handleKeyDown(e)}}></input>
          <Link to={`/search/${inputValue}`} className="searchIcon">
            <img onClick={() => { handleSubmit() }} src={process.env.PUBLIC_URL + '/img/search.png'} alt="검색"></img>
          </Link>  
          </div>
          <Row>
            <Col>
              <img style={{ cursor: "pointer" }} onClick={handleHeartClick} src={process.env.PUBLIC_URL + '/img/like.png'}></img>
            </Col>
            <Col>
              <img style={{ cursor: "pointer" }} onClick={handleCartClick} src={process.env.PUBLIC_URL + '/img/cart.png'}></img>
            </Col>
            <Col>
              <img style={{ cursor: "pointer" }} onClick={handleLinkClick} src={process.env.PUBLIC_URL + '/img/user.png'}></img>
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
        </Container>
      </header>

      <Routes>
        <Route path="/main" component={Mainbanner} element={
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
            <Route path="order" element={
              <Order></Order>
            }></Route>
            <Route path="like" element={
              <Like></Like>
            }></Route>
            <Route path="info" element={
              <Info></Info>
            }></Route>
            <Route path="infoform" element={
              <InfoForm></InfoForm>
            }></Route>
        </Route>
      </Routes>
      
        <div className="Footer">
      <Footer />
      </div>

    </div>
  );
}



export default App;
