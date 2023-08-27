import React, { useEffect, useState } from 'react'
import './style/Category.scss'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Category({ page, title, setLikeswitch }) {  

    return (
        <div className='categoryNav'>
            <CategoryBody></CategoryBody>
            
                    
        </div>
    )
}

function CategoryBody() {

    let [isopen, setIsopen] = useState(false)

    const dropdownItems = [
        { title: '스킨케어', items: ['스킨', '로션', '선케어'] },
        { title: '클렌징/필링', items: ['클렌징 폼', '클렌징 워터', '클렌징 티큐/시트'] },
        { title: '네일', items: ['일반네일', '네일케어도구', '젤네일'] },
        { title: '헤어', items: ['린스/컨디셔너', '염색/파마', '샴푸'] },
        { title: '바디', items: ['샤워/입욕용품', '바디로션/크림', '핸드/풋/데오'] },
        { title: '선풍기', items: ['USB/휴대폰', '날개없는선풍기', '탁상용'] },
        { title: '에어컨', items: ['스탠드형', '벽걸이형', '멀티형'] },
        { title: '제습기', items: ['가정용', '미니형'] },
        { title: '튜브', items: ['유아보행기튜브', '아기목튜브', '성인용 튜브'] },
        { title: '풀장/수영장', items: ['대형/패밀리풀장', '유아풀장', '워터슬라이드'] },
        { title: '물놀이보트', items: ['유아용보트', '성인용보트'] },
        { title: '스노쿨링/다이빙', items: ['스노쿨링/다이빙 세트', '마스크/잠수경', '오리발'] },
        { title: '여름장난감', items: ['물총', '비치볼'] },
        { title: '여름침구', items: ['모기장/안전망', '문발/블라인드', '쿨매트/패드'] },
        { title: '아이스크림', items: ['막대 아이스크림', '콘 아이스크림', '컵 아이스크림'] },
        { title: '국수', items: ['냉면', '메밀/모밀', '쫄면'] },
        { title: '생수/음료', items: ['생수', '탄산/스포츠음료', '숙취/건강음료'] },
        { title: '기타', items: ['서큘레이터', '냉풍기', '모기/해충 퇴치기'] },
    ]

    return (
        // <div className='categoryBody'>
        <div className='container'>
        {dropdownItems.map((category) => (
          <DropdownButton
            as={ButtonGroup}
            key={category.title}
            id={`dropdown-variants-${category.title}`}
            variant={category.title.toLowerCase()}
            title={category.title}
          >
            {category.items.map((item, index) => (
              <Dropdown.Item key={index} eventKey={String(index)}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ))}
      </div>
    )
}

// function Dropdown(props) {
//     let [animation, setAnimation] = useState(false)
//     let [repeat, setRepeat] = useState(null)

//     useEffect(() => {
//         if(props.visibility) {
//             clearTimeout(repeat)
//             setRepeat(null)
//             setAnimation(true)
//         } else {
//             setTimeout(() => {
//                 setAnimation(false)
//             }, 400)
//         }
//     }, [props.visibility])

//     return (
//       <article className={ `components-dropdown ${props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}` }>
//           { animation && props.children }
//       </article>
//     )
// }

export default Category