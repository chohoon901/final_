import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './style/MyPage.scss'
import { MdOutlineArrowForwardIos } from "react-icons/md"
import Like from './Like';
import { useEffect, useState } from 'react';

function MyPage() {

    const [activeItem, setActiveItem] = useState(null);
    const [likeswitch, setLikeswitch] = useState('');

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
                            setLikeswitch={setLikeswitch}/>
                            <NavbarItem page={'/mypage/like'} title={'찜한상품'} 
                            setLikeswitch={setLikeswitch}/>
                            <NavbarItem page={'/mypage/modify'} title={'정보수정'}
                            likeswitch={likeswitch} 
                            setLikeswitch={setLikeswitch}/>
                        </ul>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
        </>
    )
}

function NavbarItem({ page, title, setLikeswitch, likeswitch }) {
    const location = useLocation();
    const isActive = location.pathname.split('/')[2] == page.split('/')[2]

    useEffect(() => {
        if (isActive) {
          setLikeswitch('active');
        } else {
          setLikeswitch('disabled');
        }
    }, [isActive, setLikeswitch]);

    return (
        <li style={{ listStyleType: 'none' }} className={isActive ? 'active' : ''}>
          <Link to={page}>
            <span>{title}</span>
            <MdOutlineArrowForwardIos size='12' color='rgb(1, 72, 225)'/>
          </Link>
        </li>
    )
}

function Pre({isActive, setLikeswitch, page, title}) {

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={page}>
            <span>{title}</span>
            <MdOutlineArrowForwardIos size='12' color='rgb(1, 72, 225)'/>
          </Link>
        </li>
    )
}

export default MyPage;