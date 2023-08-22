import React, { useState, useEffect } from 'react';
import './style/MemberList.scss';

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // 멤버 데이터를 백엔드에서 가져와서 members 상태 업데이트
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members'); // 백엔드 API 엔드포인트
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  return (
    <div className="member-list">
      <h1>Member List</h1>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;