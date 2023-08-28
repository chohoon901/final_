import React, { useState } from 'react';
import '../route/style/Signup.scss';
import Button from '../component/Button';
import axios from "axios";

export default function Signup() {

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

  
  const [memberData, setmemberData] = useState({
    id: "",
    address: "",
    name: "",
    password: "",
    phone: "",
    provider: "",
    provider_id: "",
    username: ""
  });


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setmemberData((prevData) => ({
        ...prevData,
        [name]: value,
        username: value,  
        address: value,   
        name: value,      
        password: value,  
        phone: value      
      }));
    };
  
  const postJoin = async () => {
    let response = await axios.post(
      `http://localhost:8080/join`,
      JSON.stringify(memberData),
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
    }
  }

  return (
    <div className='signup'>
      <div className='header'>
        <h1>회원가입</h1>
      </div>
      <form className='form'>
        <div className='formGroup'>
          <label htmlFor="id">아이디</label>
          <input
            name="id"
            required
            placeholder="아이디를 입력해주세요"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            required
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="checkpassword">비밀번호 확인</label>
          <input
            name="checkpassword"
            required
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password">주소</label>
          <input
            name="adress"
            required
            placeholder="주소를 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="displayName">이름</label>
          <input
            name="displayName"
            required
            placeholder="이름을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="phone">휴대폰번호</label>
          <input
            name="phone"
            required
            placeholder="휴대폰 번호를 입력해주세요"
            type="tel"
            onChange={handleInputChange}
          />
        </div>
        <section className='btn'>
          <Button onClick={postJoin} name="가입하기" form="signup" type="submit" isPurple={true} width="100%" />
        </section>
      </form>
    </div>
  );
}