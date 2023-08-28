import React, { useEffect, useState } from 'react'
import './style/Category.scss'
import axios from "axios";
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SplitButton } from 'react-bootstrap';
import dropdownItems from '../dropDownItems';
import { useDispatch, useSelector } from 'react-redux';
import { setDataSlice, setSpecial } from '../store';

function Category() {  

    return (
        <div className='categoryNav'>
            <CategoryBody></CategoryBody>
            
                    
        </div>
    )
}

function CategoryBody() {

const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization" : localStorage.getItem("jwtToken")
    }
  };

  let dispatch = useDispatch();
  const special = useSelector((state) => state.special)
  
    const bestSub = async (selectedCategory) => {
        console.log(selectedCategory)
        const updatedSpecial = {
          ...special,
          categoryName: selectedCategory,
        };
    
        dispatch(setSpecial(updatedSpecial));
        console.log(special)
        let response = await axios.post(
          `http://localhost:8080/best_subCategory/`,
          updatedSpecial,
          config
        );
        if (response.status === 200) {
            console.log(response.data)
            dispatch(setDataSlice(response.data))
            // window.location.reload()
        }
      }

    return (
        // <div className='categoryBody'>
        <div className='category_container'>
        {dropdownItems.map((category) => (
          <SplitButton
            as={ButtonGroup}
            key={category.title}
            id="dropdown-button-drop-end"
            drop='end'
            variant={category.title.toLowerCase()}
            title={category.title}
            style={{ justifyContent: 'flex-start' }}
            onSelect={(eventKey) => {bestSub(eventKey)}}
          >
            {category.items.map((item, index) => (
              <Dropdown.Item key={index} eventKey={String(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </SplitButton>
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