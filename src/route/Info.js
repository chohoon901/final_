import { useState } from 'react';
import './style/Info.scss'
import React from 'react'


function Info() {
  return (
    <div className='myinfo'>
        <div className='header'>
            <h1>개인 정보 수정</h1>
        </div>
            <div>
            <h4>비밀번호 재확인</h4>
            <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p></div>
            <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            className='input'/>
            <button className='btn'>확인</button>
    </div>
  )
}

export default Info