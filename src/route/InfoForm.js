import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/InfoForm.scss';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';

function InfoForm() {
  
  const jwtToken = localStorage.getItem('jwtToken');
  
  let naviagete = useNavigate();
  
  const [decodedToken, setDecodedToken] = useState(null); // 초기 값은 null로 설정

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        setDecodedToken(decoded); // 상태 업데이트는 렌더링 이후에 실행됨
        console.log('Decoded Token:', decoded.id);
      } catch (error) {
        console.error('올바른 토큰이 아닙니다', error);
      }
    } else {
      alert('로그인 해주세요!');
      naviagete("/login");
    }
  }, []);

  const [user, setUser] = useState({
    id: decodedToken ? decodedToken.id : '',
    username: decodedToken ? decodedToken.username : '',
    password: '',
    name: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    if (decodedToken) {
      setUser(prevUser => ({
        ...prevUser,
        id: decodedToken.id,
        username: decodedToken.username,
      }));
    }
  }, [decodedToken]);
  
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };
  

  useEffect(() => {
    console.log(user)
  }, [user]);

  const handleChange = async (event) => {
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

  
  const patchInfo = async (request) => {
    console.log(request)
    let response = await axios.patch(
      `http://localhost:8080/update_member/`,
      request,
      config
    );
    if (response.status === 200) {
      console.log(2,2);
      naviagete("/main")
    }
}

  return (
    <div className='infoform-container'>
      <div className='infoform'>
        <h3 className='form-title'>정보 수정</h3>
          <div className='group'>
            <div className='input-group'>
              <label>아이디:</label>
              <input type="text" name="text" value={user.username} onChange={handleChange} style={{ backgroundColor: '#f2f2f2' }} readOnly/>
            </div>
          </div>
          <div className='group'>
            <div className='input-group'>
              <label>비밀번호:</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} />
            </div>
          </div>
          <div className='group'>
            <div className='input-group'>
              <label>이름:</label>
              <input type="text" name="name" value={user.name} onChange={handleChange} />
            </div>
          </div>
          <div className='group'>
            <div className='input-group'>
              <label>휴대폰 번호:</label>
              <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
            </div>
          </div>
          <div className='group'>
            <div className='input-group'>
              <label>주소:</label>
              <input type="text" name="address" value={user.address} onChange={handleChange} />
            </div>
          </div>
          <button className='btn' onClick={()=>{ patchInfo(user) }} type="submit">수정</button>
      </div>
    </div>
  );
}
export default InfoForm;