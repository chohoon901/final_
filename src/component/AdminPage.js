import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './style/AdminPage.scss';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import MemberList from '../route/MemberList';
import ProductList from '../route/ProductList';

function AdminPage() {
    const [navSwitch, setNavSwitch] = useState('');

    return (
        <>
        <header className='adminHeader'>
          <Link to="/admin">
            <img className='logo' src="/img/mainlogo.png" alt="logo"/>
            <h1 className='title'>SummerMart ADMIN PAGE</h1>
          </Link>  
        </header>
            <nav className="adminNav">
                <ul>
                    <NavbarItem page={'/admin/memberlist'} title={'멤버 조회'} setNavSwitch={setNavSwitch} />
                    <NavbarItem page={'/admin/productlist'} title={'상품 조회'} setNavSwitch={setNavSwitch} />
                </ul>
            </nav>
      <Routes>
        <Route path="/adminpage" element={<AdminPage />}>
          <Route path="memberlist" element={<MemberList />} />
          <Route path="productlist" element={<ProductList />} />
        </Route>
      </Routes>            
        </>
    );
}

function NavbarItem({ page, title, setNavSwitch }) {
    const location = useLocation();
    const isActive = location.pathname.split('/')[2] === page.split('/')[2];

    useEffect(() => {
        if (isActive) {
            setNavSwitch('active');
        } else {
            setNavSwitch('disabled');
        }
    }, [isActive, setNavSwitch]);

    return (
        <li style={{ listStyleType: 'none' }} className={isActive ? 'active' : ''}>
            <Link to={page}>
                <span>{title}</span>
                <MdOutlineArrowForwardIos size="12" color="rgb(1, 72, 225)" />
            </Link>
        </li>
    );
}

export default AdminPage;