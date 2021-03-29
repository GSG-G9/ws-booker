import React, { useState } from 'react';
import { Image, Typography, Button, Menu } from 'antd';
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import MainButton from '../../CommonComponents/Button';
import { Home, About } from '../../../utils';
import logo from '../../../assets/images/WSBooker.png';
import profileImage from '../../../assets/images/profile-user.png';
import './style.css';

const { Text } = Typography;

const Header = ({ isLogged, userImage, userName }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="navbar">
      <div className="Logo-menu-section">
        <NavLink to={Home}>
          <Image width={158} preview={false} src={logo} alt="WSBooker logo" />
        </NavLink>
        <NavLink to={Home} className="menu-item" activeClassName="active">
          HOME
        </NavLink>
        <NavLink to={About} className="menu-item" activeClassName="active">
          ABOUT
        </NavLink>
        <div className="collapsedDiv">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
            className="collapsebtn"
            theme="light"
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={collapsed}
          >
            {isLogged ? (
              <>
                <Menu.Item key="1">
                  <Image
                    preview={false}
                    src={userImage}
                    alt="user"
                    className="userImage"
                  />
                  <Text className="usernameTitle">{userName}</Text>
                </Menu.Item>
                <Menu.Item key="2">
                  <MainButton
                    icon={<LogoutOutlined />}
                    buttName="logout"
                    id="logout"
                    className="logout"
                  />
                </Menu.Item>
              </>
            ) : (
              <MainButton buttName="Log In" id="login" className="login" />
            )}
            <Menu.Item key="3">
              <NavLink to={Home} activeClassName="active">
                HOME
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to={About} activeClassName="active">
                ABOUT
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
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
            <Text className="usernameTitle">{userName}</Text>
            <MainButton
              icon={<LogoutOutlined />}
              buttName="logout"
              id="logout"
              className="logout"
            />
          </>
        ) : (
          <MainButton buttName="Log In" id="login" className="login" />
        )}
      </div>
    </div>
  );
};

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
