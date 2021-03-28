import React from 'react';
import { Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/WSBooker.png';
import profileImage from '../../../assets/images/profile-user.png';
import './style.css';

const { Title } = Typography;

const Header = ({ isLogged, userImage, userName }) => (
  <div className="navbar">
    <div className="Logo-menu-section">
      <NavLink to="/home">
        <Image width={158} preview={false} src={logo} alt="WSBooker logo" />
      </NavLink>
      <NavLink to="/home" className="home menu-item active">
        HOME
      </NavLink>
      <NavLink to="/about" className="about  menu-item ">
        ABOUT
      </NavLink>
    </div>
    <div className="user-loging">
      {isLogged ? (
        <>
          <Image
            preview={false}
            src={userImage}
            alt="user"
            className="userImage"
          />
          <Title level={5}>{userName}</Title>
        </>
      ) : (
        `login`
      )}
    </div>
  </div>
);
Header.defaultProps = {
  isLogged: false,
  userImage: profileImage,
};

Header.propTypes = {
  isLogged: PropTypes.bool,
  userImage: PropTypes.string,
  userName: PropTypes.string.isRequired,
};
export default Header;
