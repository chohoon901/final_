import React, { useEffect, useState } from 'react'
import './style/Category.scss'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import categorydata from './Categorydata';

function Category({ page, title, setLikeswitch }) {  

    return (
        <div className='categoryNav'>
            <h5>카테고리</h5>
            <CategoryBody />     
        </div>
    );
}

function CategoryBody() {

    let [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

    return (
      <div className='categoryBody'>
      {categorydata.map((category) => (
        <React.Fragment key={category.id}>
            <Link to={`/${category.name}`}>
              <span>{category.name}</span>
            </Link>
            <div onClick={toggleDropdown}>
              {isOpen ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </div>
          {isOpen && (
            <ul>
              {category.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
    </div>
  );
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