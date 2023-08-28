import React, { useEffect } from 'react'
import Category from '../component/Category'
import './style/Search.scss'
import List from '../component/List'
import axios from "axios";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChange, setInputValue, setSearch } from '../store';
import { useNavigate, useParams } from 'react-router-dom';



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

    let recommend_text ={
      input_word: ""
    }

    // let responseData = []
    let [responseData, setResponseData] = useState([])

    const recommend = async (request) => {
      recommend_text.input_word = request;
      console.log(1123123, recommend_text);
      let response = await axios.post(
        `http://localhost:8080/recommend_search`,
        recommend_text,
        config
      );
      if (response.status === 200) {
        console.log(2, response.data);
        setResponseData(response.data)
      }
    }

    useEffect(() => {
      setInput(inputValue)
      recommend(inputValue)
      dispatch(setInputValue(""))
    }, [change])

    useEffect(() => {
      getAllProduct();
    }, [keyword])

    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    let navigate = useNavigate()

    const handleSubmit = (value) => {
      navigate(`/search/${value}`);
    };
  
  return (
    <div className='container search'>
      <div className='row' style={{ flex: 8.5, marginLeft: 0 }}>
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
                          <h5 className='discount-price' style={{ width: '200px', height: '100px' }}>{truncate(body.name, 40)}</h5>
                          <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                            <p className={body.disc === 0 ? "discount-price" : "original-price"}>{`${body.price.toLocaleString('ko-KR')}₩`}</p>
                            <h5 className='discount-price' style={{ width: '200px' }}>{ body.disc === 0 ? "" : `${Math.floor(body.disc*100)}% >> ${Math.floor(body.price * (1 - body.disc)).toLocaleString('ko-KR')}₩`}</h5>
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
      <div className='row recommend' style={{ alignItems: 'flex-start', flex: 1.5, marginTop: '5rem', height: "400px", paddingTop: '10px', paddingLeft: '3px'}}>
        <div style={{ display: "flex", marginBottom: "5px", justifyContent: "center" }}>추천 상품</div>
        <div>
          {
            responseData.map((body, index) => (
              <div key={index} onClick={() => { navigate(`/detail/${body.id}`) }} style={{ textAlign: "left", marginBottom: "5px", cursor: 'pointer' }}>{index+1}. {truncate(body.name, 20)}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search