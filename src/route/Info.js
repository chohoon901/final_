import { useState } from 'react';
import './style/Info.scss'
import React from 'react'
import { Link } from 'react-router-dom';


function Info() {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handlePasswordCheck = () => {
    const 정확한비밀번호 = '실제비밀번호'; // 실제 비밀번호로 대체하세요
    const 입력한비밀번호 = document.querySelector('input[name="password"]').value;

    if (입력한비밀번호 === 정확한비밀번호) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  };

  const handleNextPage = () => {
    console.log('스프링 부트로 데이터 전송 처리');
  };

  return (
    <div className='myinfo'>
      <div className='header'>
        <h1>개인 정보 수정</h1>
      </div>
      <div>
        <h4>비밀번호 재확인</h4>
        <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
      </div>
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해 주세요"
        className='input'
      />
      <button className='btn' onClick={handlePasswordCheck}>확인</button>
      {isPasswordCorrect ? (
        <div>
          <Link to="/infoform.edit" className="btn">정보 수정</Link>
        </div>
      ) : (
        <div>
          <p>비밀번호가 올바르지 않습니다. 다시 시도해주세요.</p>
        </div>
      )}
    </div>
  );
}

export default Info;