import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InfoForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

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
      `http://localhost:8080//update_member/`,
      config
    );
    if (response.status === 200) {
      console.log(2, response.data[0]);
    }
}

  return (
    <div>
      <h2>정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이메일: {user.email}</label>
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div>
          <label>이름:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label>휴대폰 번호:</label>
          <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
        </div>
        <button onClick={patchInfo} type="submit">저장</button>
      </form>
    </div>
  );
}

export default InfoForm;