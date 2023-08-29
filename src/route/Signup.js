import React, { useState } from 'react';
import '../route/style/Signup.scss';
import Button from '../component/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

  
  const [memberData, setmemberData] = useState({
    address: "",
    name: "",
    password: "",
    phone: "",
    username: "",
    provider: "",
    provider_id: ""
  });


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setmemberData((prevData) => ({
        ...prevData,
        [name]: value     
      }));
      console.log(1212, memberData)
    };

    let navigate = useNavigate()
  
  const postJoin = async () => {
    console.log(2222, memberData)
    let response = await axios.post(
      `/api4/join`,
      JSON.stringify(memberData),
      config
    );
    if (response.status === 200) {
      navigate("/main")
    }
  }

  return (
    <div className='signup'>
      <div className='header'>
        <h1>회원가입</h1>
      </div>
        <div className='formGroup'>
          <label htmlFor="username">아이디</label>
          <input
            name="username"
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
          <label htmlFor="address">주소</label>
          <input
            name="address"
            required
            type="text"
            placeholder="주소를 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="name">이름</label>
          <input
            name="name"
            required
            type="text"
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
          <Button onClick={postJoin} name="가입하기" form="signup" isPurple={true} width="100%" />
        </section>
    </div>
  );
}