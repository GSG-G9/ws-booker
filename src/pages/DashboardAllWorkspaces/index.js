import React from 'react';
import {
  Image,
  Typography,
  Menu,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
} from 'antd';
import { NavLink } from 'react-router-dom';

import { AllWorkspaces, AddWorkspace, Home } from '../../utils';

import logo from '../../assets/images/WSBooker.png';
import list from '../../assets/icons/list.svg';
import add from '../../assets/icons/add.svg';
import logout from '../../assets/icons/logout.svg';
import './style.css';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
const { Title, Text } = Typography;
const DashboardAllWorkspaces = () => (
  <div className="main-contain">
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
        <Menu.Item key="3">
          <Image preview={false} src={logout} alt="" />
          <NavLink to={Home}>Log out</NavLink>
        </Menu.Item>
      </Menu>
    </div>
    <div className="table_container">
      <Title level={2} className="table-title">
        All Workspaces
      </Title>
    </div>
  </div>
);

export default DashboardAllWorkspaces;
