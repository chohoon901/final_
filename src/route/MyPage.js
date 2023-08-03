import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './style/MyPage.scss'
import { MdOutlineArrowForwardIos } from "react-icons/md"
import Like from './Like';
import { useState } from 'react';

function MyPage() {

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (page) => {
        setActiveItem(page);
    };
    
    return (
        <>
        <div className='container'>
            <div className='mypage'>
                <div className='my'>
                    <h1>마이페이지</h1>
                    <div className='mypageNav'>
                        <ul>
                            <NavbarItem page={'/mypage/order'} title={'주문내역'} 
                            activeItem={activeItem}
                            onClick={handleItemClick}/>
                            <NavbarItem page={'/mypage/like'} title={'찜한상품'} 
                            activeItem={activeItem}
                            onClick={handleItemClick}/>
                            <NavbarItem page={'/mypage/modify'} title={'정보수정'} 
                            activeItem={activeItem}
                            onClick={handleItemClick}/>
                        </ul>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
        </>
    )
}

function NavbarItem(props) {
    const { page, title, activeItem, onClick } = props;
    const isActive = activeItem === page;

    return (
        <li style={{ listStyleType: 'none' }} className={isActive ? 'active' : ''}>
          <Link to={page} onClick={() => onClick(page)}>
            <span>{title}</span>
            <MdOutlineArrowForwardIos size='12' color='rgb(1, 72, 225)'/>
          </Link>
        </li>
    )
}

export default MyPage;