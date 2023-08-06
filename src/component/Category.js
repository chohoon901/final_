import React, { useEffect, useState } from 'react'
import './style/Category.scss'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"

function Category({ page, title, setLikeswitch }) {  

    return (
        <div className='categoryNav'>
            <h5>카테고리</h5>
            <CategoryBody></CategoryBody>
            
                    
        </div>
    )
}

function CategoryBody() {

    let [isopen, setIsopen] = useState(false)

    return (
        <div className='categoryBody'>
          <div className='container'>
              <Link to="List">
                  <span>스킨케어</span>
              </Link>
              <div onClick={() => {setIsopen(!isopen)}}>
                  {
                      // 대분류 화살표를 누르면 소분류가 튀어나온다.
                      // 다시 누르면 원래대로 돌아간다.
                      // 모든 분류들은 누르면 각각의 물건 리스트가 뜬다. 
                      isopen == true
                      ? <MdOutlineKeyboardArrowUp></MdOutlineKeyboardArrowUp>
                      : <MdOutlineKeyboardArrowDown></MdOutlineKeyboardArrowDown>
                  }
              </div>
          </div>
          <Dropdown visibility={isopen}>
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
            </ul>
          </Dropdown>
        </div>
    )
}

function Dropdown(props) {
    let [animation, setAnimation] = useState(false)
    let [repeat, setRepeat] = useState(null)

    useEffect(() => {
        if(props.visibility) {
            clearTimeout(repeat)
            setRepeat(null)
            setAnimation(true)
        } else {
            setTimeout(() => {
                setAnimation(false)
            }, 400)
        }
    }, [props.visibility])

    return (
      <article className={ `components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}` }>
          { animation && props.children }
      </article>
    )
}

export default Category