import React, { useState, useContext } from 'react';
import { Image, Typography, Button, Menu } from 'antd';
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../firebase/context';
import loginWithGoogle from '../../../Login/loginWithGoogle';

import MainButton from '../../CommonComponents/Button';
import { Home, About } from '../../../utils';
import logo from '../../../assets/images/WSBooker.png';
import app from '../../../firebase/config';
import './style.css';

const { Text } = Typography;

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, setError } = useContext(AuthContext);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleOnClick = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err);
    }
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
            {user ? (
              <>
                <Menu.Item key="1">
                  <Image
                    preview={false}
                    src={user.image}
                    alt="user"
                    className="userImage"
                  />
                </Menu.Item>
                <Menu.Item key="2">
                  <MainButton
                    icon={<LogoutOutlined />}
                    id="logout"
                    className="logout userImage"
                    onClick={() => {
                      app.auth().signOut();
                    }}
                  />
                </Menu.Item>
              </>
            ) : (
              <Menu.Item key="3">
                <MainButton
                  buttName="Log In"
                  id="login"
                  icon={<GoogleOutlined />}
                  className="login"
                  onClick={handleOnClick}
                />
              </Menu.Item>
            )}

            <Menu.Item key="4">
              <NavLink to={Home} activeClassName="active">
                HOME
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to={About} activeClassName="active">
                ABOUT
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="user-loging">
        {user ? (
          <>
            <Image
              preview={false}
              src={user.image}
              alt="user"
              className="userImage"
            />
            <Text className="usernameTitle">{user.name}</Text>
            <MainButton
              icon={<LogoutOutlined />}
              buttName="logout"
              id="logout"
              className="logout"
              onClick={() => app.auth().signOut()}
            />
          </>
        ) : (
          <MainButton
            buttName="Log In with Google"
            id="login"
            icon={<GoogleOutlined />}
            className="login"
            onClick={handleOnClick}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
