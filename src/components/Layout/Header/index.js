import React, { useContext } from 'react';
import { Image, Typography, Menu, Dropdown } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  GoogleOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../firebase/context';
import loginWithGoogle from '../../../Login/loginWithGoogle';
import MainButton from '../../CommonComponents/Button';
import { Home, About } from '../../../utils';
import logo from '../../../assets/images/WSBooker.png';
import app from '../../../firebase/config';
import Loader from '../../CommonComponents/Loader';
import './style.css';

const { Text } = Typography;

const Header = () => {
  const {
    user,
    setError,
    isLoading,
    editedImage,
    editedName,
    isAdminLoading,
  } = useContext(AuthContext);

  const handleOnClick = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to={Home}>
          <HomeOutlined style={{ color: '#00C78A' }} />
          HOME
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={About}>
          <InfoCircleOutlined style={{ color: '#00C78A' }} />
          ABOUT
        </NavLink>
      </Menu.Item>

      {isLoading ? (
        <Loader size="small" />
      ) : (
        <>
          {user ? (
            <>
              <Menu.Item key="3">
                <NavLink to={`/user/${user.id}`}>
                  <InfoCircleOutlined style={{ color: '#00C78A' }} />
                  PROFILE
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  app.auth().signOut();
                }}
              >
                <LogoutOutlined style={{ color: '#00C78A' }} />
                LogOut
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="4" onClick={handleOnClick}>
              <GoogleOutlined style={{ color: '#00C78A' }} />
              Login
            </Menu.Item>
          )}
        </>
      )}
    </Menu>
  );

  return (
    <div className="navbar">
      <div className="Logo-menu-section">
        <NavLink to={Home}>
          <Image width={158} preview={false} src={logo} alt="WSBooker logo" />
        </NavLink>
        <NavLink
          to={Home}
          className="menu-item"
          activeClassName="active-navbar"
        >
          HOME
        </NavLink>
        <NavLink
          to={About}
          className="menu-item"
          activeClassName="active-navbar"
        >
          ABOUT
        </NavLink>
        <div className="collapsedDiv">
          <Dropdown.Button
            overlay={menu}
            icon={<UserOutlined style={{ color: '#00C78A' }} />}
          >
            {isLoading || isAdminLoading ? (
              <Loader size="small" />
            ) : (
              user && (editedName || user.name)
            )}
          </Dropdown.Button>
          {isLoading || isAdminLoading ? (
            <Loader size="small" />
          ) : (
            user && (
              <NavLink to={`/user/${user.id}`}>
                <Image
                  preview={false}
                  src={editedImage || user.image}
                  alt="user"
                  className="userImage2"
                />
              </NavLink>
            )
          )}
        </div>
      </div>
      <>
        <div className="user-loging">
          {isLoading || isAdminLoading ? (
            <Loader size="small" />
          ) : (
            <>
              {user ? (
                <>
                  <NavLink to={`/user/${user.id}`}>
                    <Image
                      preview={false}
                      src={editedImage || user.image}
                      alt="user"
                      className="userImage"
                    />
                  </NavLink>
                  <Text className="usernameTitle">
                    {editedName || user.name}
                  </Text>
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
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default Header;
