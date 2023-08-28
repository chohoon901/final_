import React, { Component } from 'react';
import './style/Mainbanner.scss';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const images = [
  `${process.env.PUBLIC_URL}/img/main1.jpg`,
  `${process.env.PUBLIC_URL}/img/main2.jpg`,
  `${process.env.PUBLIC_URL}/img/main3.jpg`
  // 추가 이미지 경로들...
];

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class Mainbanner extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.timer = null; // 타이머 변수 초기화
    console.log("navigate : " + this.props.navigate);
    console.log("location : " + this.props.location);
  }

  componentDidMount() {
    // 컴포넌트가 마운트될 때 타이머 시작
    this.startTimer();
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트될 때 타이머 중지
    this.stopTimer();
  }

  startTimer = () => {
    // 3초마다 currentIndex를 변경하는 타이머 설정
    this.timer = setInterval(this.nextSlide, 3000);
  };

  stopTimer = () => {
    // 타이머 중지
    clearInterval(this.timer);
  };

  prevSlide = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex - 1 + images.length) % images.length,
    }));
  };

  nextSlide = () => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % images.length,
    }));
  };
  

  render() {
    const { currentIndex } = this.state;
    
    let num = [1503,1717,842]
    return (
      <div className="image-slider" onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
        <div style={{ position: 'relative' }}> 
          <MdArrowBackIos style={{ position: 'absolute', top: '50%', right: 0 }} className="prev-button" onClick={this.prevSlide}></MdArrowBackIos>
          <img className="slide-image" src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{ cursor: 'pointer' }} />
          <MdArrowForwardIos style={{ position: 'absolute', top: '50%', right: 0 }} className="next-button" onClick={this.nextSlide}></MdArrowForwardIos>
        </div>
        <div className='images'>
          <div className='my' style={{ marginTop: '5rem', marginBottom: '3rem' }}>
              <h1>오늘의 특가</h1>
          </div>
          <div className='boundary'>
            <div className='temporary'>
              <Link to={"/detail/" + 2}>
                {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
                {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
                <img style={{ height : '200px' }} src="http://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/46e3/    ae7faa474e37f464ddfd8cec8e52b63678f8911c50f06051891af4656eed.jpg"></img>
              </Link>
              <div className="product-details">
              <div>템피아 대형제습기</div>
              <div>738000원</div>
              </div>
            </div>
            <div className='temporary'>
              <Link to={"/detail/" + 3}>
                {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
                {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
                <img style={{ height : '200px' }} src="http://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2b3a/    e1f41dc2a98e8257365f7dec7c9028aa64e5f6d7af34528cb7e5d5a6805e.jpg"></img>
              </Link>
              <div className="product-details">
              <div>신일 산업용제습기</div>
              <div>1390900원</div>
              </div>
            </div>
            <div className='temporary'>
              <Link to={"/detail/" + 4}>
                {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
                {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
                <img style={{ height : '200px' }} src="http://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/031e/    6ee1aabb639961a532ebe0b3c44a1daf8c680554ff6e05952fe4668cd051.jpg"></img>
              </Link>
              <div className="product-details">
              <div>단미 DA-APD01</div>
              <div>18000원</div>
              </div>
            </div>
            <div className='temporary'>
              <Link to={"/detail/" + 5}>
                {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
                {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
                <img style={{ height : '200px' }} src="http://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/    58741107384460-4b3100d4-4d1e-40b1-9505-a7d3db71ecc0.jpg"></img>
              </Link>
              <div className="product-details">
              <div>신일 인공지능 제습기</div>
              <div>209000원</div>
              </div>
            </div>
            <div className='temporary'>
              <Link to={"/detail/" + 6}>
                {/* TODO : 0자리에 데이터에서 id값 받아오기 */}
                {/* <img style={{ height : '345px' }} src={process.env.PUBLIC_URL + '/img/fan.jpg'}></img> */}
                <img style={{ height : '200px' }} src="http://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/d153/    2fb762447920a9283b9a20b141e03fd3756b8cc88e802474aa083cc6a624.jpg"></img>
              </Link>
              <div className="product-details">
              <div>신일 대형 업소용</div>
              <div>588000원</div>
              </div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

export default Mainbanner;


