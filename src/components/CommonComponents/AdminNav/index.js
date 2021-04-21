import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Typography, Menu } from 'antd';
import { AllWorkspaces, AddWorkspace } from '../../../utils';
import list from '../../../assets/icons/list.svg';
import add from '../../../assets/icons/add.svg';
import './style.css';

const { Title } = Typography;
const AdminNav = () => (
  <div className="dashboard-nav">
    <Title level={3} className="nav-title">
      Dashboard
    </Title>
    <Menu className="dashboard-menu">
      <Menu.Item key="1">
        <Image preview={false} src={list} alt="" />
        <NavLink to={AllWorkspaces}>All Workspaces</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <Image preview={false} src={add} alt="" />
        <NavLink to={AddWorkspace}>Add Workspace</NavLink>
      </Menu.Item>
    </Menu>
  </div>
);

export default AdminNav;
