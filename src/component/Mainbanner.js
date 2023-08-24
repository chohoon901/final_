import React, { Component } from 'react';
import './style/Mainbanner.scss';

const images = [
  `${process.env.PUBLIC_URL}/img/main1.jpg`,
  `${process.env.PUBLIC_URL}/img/main2.jpg`,
  `${process.env.PUBLIC_URL}/img/main3.jpg`
  // 추가 이미지 경로들...
];

class Mainbanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.timer = null; // 타이머 변수 초기화
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

    return (
      <div className="image-slider" onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
        <button className="prev-button" onClick={this.prevSlide}>
          Previous
        </button>
        <img className="slide-image" src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        <button className="next-button" onClick={this.nextSlide}>
          Next
        </button>
      </div>
    );
  }
}

export default Mainbanner;


