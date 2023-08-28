import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/InfoForm.scss';

function InfoForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

  useEffect(() => {
    // 서버로부터 로그인한 사용자 정보를 가져옵니다.
    axios.get('/api/getCurrentUser')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/updateUser', user) // 백엔드 API 호출
      .then((response) => {
        console.log(response.data);
        // 성공 처리
      })
      .catch((error) => {
        console.error(error);
        // 에러 처리
      });
  };

  
  const patchInfo = async () => {
    let response = await axios.patch(
      `http://localhost:8080/update_member/`,
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
    }
}

  return (
    <div className='infoform-container'>
      <div className='infoform'>
        <h3 className='form-title'>정보 수정</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className='input-group'>
              <label>아이디:</label>
              <span>{user.email}</span>
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <label>비밀번호:</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <label>이름:</label>
              <input type="text" name="name" value={user.name} onChange={handleChange} />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <label>휴대폰 번호:</label>
              <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
            </div>
          </div>
          <button className='btn' onClick={patchInfo} type="submit">저장</button>
        </form>
      </div>
    </div>
  );
}
export default InfoForm;