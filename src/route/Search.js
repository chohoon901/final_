import React, { useEffect } from 'react'
import Category from '../component/Category'
import './style/Best.scss'
import List from '../component/List'
import axios from "axios";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue } from '../store';
import { useParams } from 'react-router-dom';



const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization" : localStorage.getItem("jwtToken")
  }
};


function Search() {

    let dispatch = useDispatch();
    const isSearch = useSelector((state) => state.isSearch)
    const inputValue = useSelector((state) => state.inputValue)
    const change = useSelector((state) => state.change)

  
    const [input, setInput] = useState(''); // 검색단어 담김
  
  
  // if(isSearch === true) {
      //   useEffect(() => {
          //     window.location.reload()
        //   })
        // }
        
    const [products, setProducts] = useState([]);
    const { keyword } = useParams(); // URL 파라미터 추출
    
    const getAllProduct = async () => {
      const response = await axios.get(
      `http://localhost:8080/product_search?keyword=${encodeURIComponent(keyword)}`,
      config // 설정에 따라 수정
    );
    if (response.status === 200) {
      console.log(response.data) // 가져오는거 확인 완료
      setProducts(response.data)
    } 

    };

    useEffect(() => {
      setInput(inputValue)
      dispatch(setInputValue(""))
    }, [change])

    useEffect(() => {
      getAllProduct();
    }, [keyword])

    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };
  
  return (
    <div className='container'>
      <button onClick={() => {console.log(input)}}>버튼</button>
      <div className='row'>
        <div className='listTitle'>
            <h2>검색 결과</h2>
        </div>
        <div className='ProductList'>
          <h1></h1>
              <div>
              <div className='content'>
                <div className='row row-cols-4'>
                  {
                    products.map((body, index) => (
                      <div className='col' onClick={() => {window.location.href=`/detail/${body.id}`}} key={index} style={{ cursor: 'pointer' }}>
                        <div className='product-item'>
                          <div style={{ display: 'none' }}>{body.id}</div>
                          <img src={body.picture} alt={body.name} style={{ width: '200px', height: '200px' }} />
                          <h5 className='discount-price' style={{ width: '235px', height: '100px' }}>{truncate(body.name, 40)}</h5>
                          <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                            <p className={body.disc === 0 ? "discount-price" : "original-price"}>{`${body.price.toLocaleString('ko-KR')}₩`}</p>
                            <h5 className='discount-price'>{ body.disc === 0 ? "" : `${Math.floor(body.disc*100)}% >> ${Math.floor(body.price * (1 - body.disc)).toLocaleString('ko-KR')}₩`}</h5>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <hr className="gray-line" />
            </div>
        </div>
        <div>
        <button onClick={getAllProduct}>버튼</button>
        </div>
      </div>
    </div>
  )
}

export default Search