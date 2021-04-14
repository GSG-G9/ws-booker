import React, { useState, useEffect } from 'react';
import {
  Image,
  Typography,
  Menu,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Tag,
  message,
} from 'antd';
import { NavLink } from 'react-router-dom';
import Column from 'antd/lib/table/Column';
import { getAllWorkspaces } from '../../firebase/firestore/workspace';
import { AllWorkspaces, AddWorkspace, Home } from '../../utils';
import Loader from '../../components/CommonComponents/Loader';
import list from '../../assets/icons/list.svg';
import add from '../../assets/icons/add.svg';
import logout from '../../assets/icons/logout.svg';
import './style.css';
// const { Column, ColumnGroup } = Table;
const { Title, Text } = Typography;

const DashboardAllWorkspaces = () => {
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getAllWorkspaces();
      setAllWorkspaces(data);
      console.log(allWorkspaces);
      setIsLoading(false);
    } catch (err) {
      message.error('Something went wrong , Please try again');
    }
  };

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      fetchData();
    }
    return () => {
      isActive = false;
    };
  }, []);
  return (
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
        {isLoading ? (
          <Loader size="large" />
        ) : (
          <div className="table-sub-container">
            <Table
              dataSource={allWorkspaces}
              pagination={{
                pageSize: 4,
              }}
            >
              <Column title="Name" dataIndex="name" key="name" width="130px" />
              <Column title="City" dataIndex="city" key="city" width="130px" />
              <Column
                title="Rate"
                dataIndex="rating"
                key="rating"
                width="130px"
              />
              <Column
                title="Capacity"
                dataIndex="capacity"
                key="capacity"
                width="130px"
              />
              <Column
                title="Start Time"
                dataIndex="start_time"
                key="start_time"
                width="130px"
              />
              <Column
                title="End Time"
                dataIndex="end_time"
                key="end_time"
                width="130px"
              />
              <Column
                title="Fees per Day"
                dataIndex="fees_per_day"
                key="fees_per_day"
                width="130px"
              />
              <Column
                title="Fees per Hour"
                dataIndex="fees_per_hour"
                key="fees_per_hour"
                width="130px"
              />
              <Column
                title="Address"
                dataIndex="location"
                key="location"
                width="130px"
              />
              <Column
                title="Amenities"
                dataIndex="amenities"
                key="amenities"
                width="130px"
                render={(amenities) => (
                  <>
                    {amenities.map((tag) => (
                      <Text key={tag}>{tag} </Text>
                    ))}
                  </>
                )}
              />
              <Column
                title="Days of Work"
                dataIndex="days_of_work"
                key="days_of_work"
                width="130px"
                render={(daysOfWork) => (
                  <>
                    {daysOfWork.map((tag) => (
                      <Text key={tag}>{tag} </Text>
                    ))}
                  </>
                )}
              />
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardAllWorkspaces;
