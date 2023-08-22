import React from 'react';
import { Link } from 'react-router-dom';
import './style/Footer.scss';

export default function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    
      return (
        <div className='footer'>
          <div className='container'>
            <div className='left'>
              <h3>SummerMart 고객센터</h3>
              <h2>0000-0000<span>공휴일 제외 오전 9시 - 오후 6시</span></h2>
              <div className='btnContent'>
                <span>카카오톡 문의</span><p>공휴일 제외 오전 9시 - 오후 6시</p>
              </div>
              <div className='btnContent'>
                <span>1:1 문의</span><p>365일<br/>고객센터 운영시간에 순차적으로 답변드리겠습니다.</p>
              </div>
            </div>
            <div className='right'>
              <ul className='navbar'>
                <li><Link to="/">SummerMart</Link></li>
                <li><Link to="/mypage/order">마이페이지</Link></li>
                <li>이용약관</li>
                <li>개인정보처리방침</li>
                <li>이용안내</li>
              </ul>
              <p className='notice'>
                법인명 : SummerMart <span className='line'></span> 사업자등록번호 : 00000000<br/>
                통신판매업 : 제 2023-서울금천-00000 호 <span className='line'></span> 개인정보보호책임자 <br/>
                주소 : 서울특별시 금천구 대륭17차 <span className='line'></span> 대표이사 <br/>
                입점문의 : 0000-0000 <span className='line'></span> 채용문의 : 0000-0000
              </p>
            </div>
          </div>
          <p className='copy'>© {year}.  SummerMart. All rights reserved.</p>
        </div>
      )
    }