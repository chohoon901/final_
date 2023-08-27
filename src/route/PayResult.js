import React, { useState } from 'react';
import Button from '../component/Button.jsx';
import './style/PayResult.scss';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);


  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

//   const getAllProduct = async () => {
//     let response = await axios.get(
//       `http://localhost:8080/get_products/`,
//       config
//     );
//     if (response.status === 200) {
//       (response.data);
//     }
//   }


  const handlePaymentComplete = () => {
    // 여기서 실제 결제 API를 호출하고, 결제 정보를 받아온다.
    const mockPaymentData = {
      payment_id: '1',
      amount: 10000,
      products: ['Product 1', 'Product 2'],
    };

    setPaymentInfo(mockPaymentData);
  };

  return (
    <div>
      {/* 결제 내용 및 버튼
      <button onClick={handlePaymentComplete}>Complete Payment</button> */}

      {/* 결제 완료 정보 */}
      {paymentInfo && (
        <div>
          <h2>결제가 완료되었습니다.</h2>
          <p>Payment ID: {paymentInfo.payment_id}</p>
          <p>Amount: {paymentInfo.amount}</p>
          <p>결제 상품</p>
          <ul>
            {paymentInfo.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
          <Button>홈</Button>
          <Button>마이페이지</Button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;