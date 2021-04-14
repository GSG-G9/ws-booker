import React, { useState } from 'react';
import { Image, Typography, Menu, Divider, message, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';

import { AllWorkspaces, AddWorkspace, Home } from '../../utils';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import { addWorkspace } from '../../firebase/firestore/workspace';
import logo from '../../assets/images/WSBooker.png';
import list from '../../assets/icons/list.svg';
import add from '../../assets/icons/add.svg';
import logout from '../../assets/icons/logout.svg';
import './style.css';

const { Title, Text } = Typography;
const DashboardAddWorkspace = () => {
  const [adminData, setAdminData] = useState([]);
  const [workspaceData, setWorkspaceData] = useState({});
  const [workspaceName, setWorkspaceName] = useState();

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    setWorkspaceName(name);
    console.log('user', workspaceName);
  };

  const handleChangeDescription = () => {
    // e.preventDefault();
    console.log('user', workspaceData);
  };

  return (
    <div className="main-container">
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
      <div className="dashboard-container">
        <Image width={158} preview={false} src={logo} alt="WSBooker logo" />
        <div className="admin-data">
          <Image preview={false} src={adminData.image} alt="" className="" />
          <Text className="">{adminData.name}</Text>
        </div>
        <form className="add-ws-form">
          <Title level={3}>Add Workspace </Title>
          <Divider />
          <div className="half-section-left">
            <MainInput
              label="Workspace Name"
              name="workspaceName"
              value={workspaceData.name}
              onChange={handleChangeName}
            />
            <div className="upload-section">
              <Text className="label">Header Image</Text>
              <input type="file" {...props} />
            </div>
          </div>
          <div className="half-section-right">
            <Image alt="Header Image" />
          </div>
          <MainInput
            label="Description"
            name="Description"
            type="textArea"
            className="textarea-description"
            // onChange={handleChangeDescription}
          />
          <div className="half-section-left">
            <Text className="label">Days of Work</Text>
            <div className="checkout-container">
              <Checkbox>Sun</Checkbox>
              <Checkbox>Mon</Checkbox>
              <Checkbox>Tue</Checkbox>
              <Checkbox>Wed</Checkbox>
              <Checkbox>The</Checkbox>
              <Checkbox>Fri</Checkbox>
              <Checkbox>Sat</Checkbox>
            </div>
            <MainInput
              label="Hours of Operation"
              name="hoursOfOperation"
              type="time"
              // onChange={}
            />
          </div>
          <div className="half-section-right">
            <MainInput
              label="Fees per Hour"
              name="feesPerHour"
              type="number"
              // onChange={}
            />
            <MainInput
              label="Fees per Day"
              name="feesPerDay"
              type="number"
              // onChange={}
            />
            <MainInput
              label="Total Capacity"
              name="totalCapacity"
              type="number"
              // onChange={}
            />
          </div>
          <MainInput
            label="Location Details"
            name="locationDetails"
            placeholder="Town / City"
            // onChange={}
          />
          <div className="amentities-Contaienr">
            <Text className="label">Amenities</Text>
            <div className="amenities">
              <Checkbox className="check">High Speed WiFi</Checkbox>
              <Checkbox className="check">Library</Checkbox>
              <Checkbox className="check">Scanner</Checkbox>
              <Checkbox className="check">Free Coffee </Checkbox>
              <Checkbox className="check">Lounge / Chill-out Area</Checkbox>
              <Checkbox className="check">Kitchen</Checkbox>
              <Checkbox className="check">Air Conditioning</Checkbox>
              <Checkbox className="check">Computers</Checkbox>
              <Checkbox className="check">Projector</Checkbox>
            </div>
          </div>

          <div className="images-section">
            <Text className="label">Additional Images</Text>
            <input type="file" {...props} />
          </div>
          <div className="buttons-section">
            <MainButton buttName="Add" className="add" />
            <MainButton buttName="Cancel" type="default" className="cancel" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddWorkspace;
