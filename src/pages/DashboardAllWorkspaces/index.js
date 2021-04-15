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
  Icon,
  message,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Column from 'antd/lib/table/Column';
import MainButton from '../../components/CommonComponents/Button';
import {
  getAllWorkspaces,
  addWorkspace,
  DeleteWorkspace,
} from '../../firebase/firestore/workspace';
import { AllWorkspaces, AddWorkspace, Home } from '../../utils';
import Loader from '../../components/CommonComponents/Loader';
import list from '../../assets/icons/list.svg';
import add from '../../assets/icons/add.svg';
import logout from '../../assets/icons/logout.svg';

import './style.css';
// const { Column, ColumnGroup } = Table;
const { Title, Text } = Typography;
// const payload = {
//   name: 'Hi Gaza',
//   description:
//     'uMake is a CoWorking Space and Makerspace based in the center of Ramallah City in Palestine',
//   days_of_work: ['Sun', 'Mon'],
//   start_time: '09:00:00',
//   end_time: '20:00:00',
//   fees_per_hour: 10,
//   fees_per_day: 50,
//   capacity: 60,
//   location: '5th Floor, Ammar Tower, Ramallah, Palestine',
//   amenities: ['High-Speed WiFi', 'Heating', 'Air Conditioning'],
//   city: 'Deir-Albalah',
//   header_image:
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/main-1522929829.jpg?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//   image_gallery: [
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/1-1540639636.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/2-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/3-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//   ],
//   rating: 4,
// };
// addWorkspace(payload)
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));
const DashboardAllWorkspaces = () => {
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [deletePerformed, setDeletePerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getAllWorkspaces();
      setAllWorkspaces(data);
      console.log(data);
      setIsLoading(false);
      setDeletePerformed(false);
    } catch (err) {
      message.error('Something went wrong , Please try again');
    }
  };
  const handleDelete = async (key) => {
    try {
      const deleteMassage = await DeleteWorkspace(key);
      setDeletePerformed(true);
      message.success(deleteMassage.msg);
    } catch (err) {
      message.error('Something went wrong , please try again');
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
  }, [deletePerformed]);
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
              rowKey={(record) => record.id}
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
              {/* <Column
                title="Description"
                dataIndex="description"
                key="description"
                width="130px"
                render={(description) => (
                  <div
                    style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
                  >
                    {description}
                  </div>
                )}
              /> */}
              <Column
                title="Action"
                dataIndex="action"
                key="action"
                width="130px"
                render={(_, record) =>
                  allWorkspaces.length >= 1 ? (
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => handleDelete(record.id)}
                    >
                      <MainButton
                        style={{ backgroundColor: '#DA3743', border: 'none' }}
                        icon={<DeleteOutlined style={{ color: '#FFFFFF' }} />}
                      />
                    </Popconfirm>
                  ) : null
                }
                // render={() => (
                //   <Space size="middle">
                //     <>
                //       <MainButton
                //         style={{ backgroundColor: '#DA3743', border: 'none' }}
                //         icon={<DeleteOutlined style={{ color: '#FFFFFF' }} />}
                //       />
                //     </>
                //     <EditOutlined style={{ color: '#2A9835' }} />
                //   </Space>
                // )}
              />
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
export default DashboardAllWorkspaces;
