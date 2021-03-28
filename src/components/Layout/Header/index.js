import React from 'react';
import { Image } from 'antd';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/images/WSBooker.png';
import './style.css';

const Header = () => (
  <div className="navbar">
    <div className="Logo-menu-section">
      <Image width={200} preview={false} src={logo} alt="WSBooker logo" />
      <NavLink to="/home">Home</NavLink>

      <NavLink to="/about">About</NavLink>
    </div>
    <div className="user-loging">User</div>
  </div>
);
export default Header;
