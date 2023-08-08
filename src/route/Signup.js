import React, { useState } from 'react';
import '../route/style/Signup.scss';
import Button from '../component/Button';

export default function Signup() {
  return (
    <div className='signup'>
      <div className='header'>
        <h1>회원가입</h1>
      </div>
      <form className='form'>
        <div className='formGroup'>
          <label htmlFor="email">이메일</label>
          <input
            name="email"
            required
            placeholder="이메일을 입력해주세요"
            type="email"
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            required
            placeholder="비밀번호를 입력해주세요"
            type="password"
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="checkpassword">비밀번호 확인</label>
          <input
            name="checkpassword"
            required
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="displayName">이름</label>
          <input
            name="displayName"
            required
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="phone">휴대폰번호</label>
          <input
            name="phone"
            required
            placeholder="휴대폰 번호를 입력해주세요"
            type="tel"
          />
        </div>
        <section className='btn'>
          <Button name="가입하기" form="signup" type="submit" isPurple={true} width="100%" />
        </section>
      </form>
    </div>
  );
}