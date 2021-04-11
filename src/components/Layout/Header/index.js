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
  const { user, setError, isLoading } = useContext(AuthContext);
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
              <Menu.Item
                key="3"
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
        <NavLink to={Home} className="menu-item" activeClassName="active">
          HOME
        </NavLink>
        <NavLink to={About} className="menu-item" activeClassName="active">
          ABOUT
        </NavLink>
        <div className="collapsedDiv">
          <Dropdown.Button
            overlay={menu}
            icon={<UserOutlined style={{ color: '#00C78A' }} />}
          >
            {isLoading ? <Loader size="small" /> : user && `  ${user.name}!`}
          </Dropdown.Button>
          {user && (
            <Image
              preview={false}
              src={user.image}
              alt="user"
              className="userImage2"
            />
          )}
        </div>
      </div>
      <>
        {isLoading ? (
          <Loader size="small" />
        ) : (
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
        )}
      </>
    </div>
  );
};

export default Header;
