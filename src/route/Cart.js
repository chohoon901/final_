import './style/Cart.scss'
import { LiaPlusSolid, LiaEqualsSolid } from "react-icons/lia"

function Cart() {


    
    return (
        <div className='container myCart'>
            <div className='header'>
                <h1>장바구니</h1>
            </div>
            <div className='container body'>
                <div> map 사용해서 물품 나열 </div>
            </div>
            <div className='result px-5 py-5'>
                <h6>총 상품가격</h6>
                <h6>0</h6>
                <h6>원</h6>
                <LiaPlusSolid></LiaPlusSolid>
                <h6>총 배송비</h6>
                <h6>0</h6>
                <h6>원</h6>
                <LiaEqualsSolid></LiaEqualsSolid>
                <h6>총 주문금액</h6>
                <h6>0</h6>
                <h6>원</h6>
            </div>
        </div>
    )
}

export default Cart;