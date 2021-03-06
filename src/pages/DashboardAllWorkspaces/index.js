/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
  Image,
  Typography,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  message,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MainButton from '../../components/CommonComponents/Button';
import AdminNav from '../../components/CommonComponents/AdminNav';
import {
  getAllWorkspaces,
  editWorkspace,
  DeleteWorkspace,
} from '../../firebase/firestore/workspace';
import Loader from '../../components/CommonComponents/Loader';

import './style.css';

const { Title, Text } = Typography;
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        dataIndex === 'start_time' || dataIndex === 'end_time' ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::([0-5][0-9]))?$/,
                message: 'Please, enter valid time HH:MM',
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : dataIndex === 'rating' ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            <Input disabled />
          </Form.Item>
        ) : (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

const DashboardAllWorkspaces = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [deletePerformed, setDeletePerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [runEffect, setRunEffect] = useState(false);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const editMsg = await editWorkspace(key, row);
      message.success(editMsg.msg);
      setRunEffect((x) => !x);
      setEditingKey('');
    } catch (errInfo) {
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '130px',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: '130px',
      editable: true,
    },

    {
      title: 'Rate',
      dataIndex: 'rating',
      key: 'rating',
      editable: true,
      width: '130px',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      editable: true,
      width: "'130px'",
    },

    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      editable: true,
      width: '130px',
    },

    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      editable: true,
      width: '130px',
    },
    {
      title: 'Fees per Day',
      dataIndex: 'fees_per_day',
      key: 'fees_per_day',
      editable: true,
      width: '130px',
    },

    {
      title: 'Fees per Hour',
      dataIndex: 'fees_per_hour',
      key: 'fees_per_hour',
      editable: true,
      width: '130px',
    },
    {
      title: 'Address',
      dataIndex: 'location',
      key: 'location',
      editable: true,
      width: '130px',
    },
    {
      title: 'Amenities',
      dataIndex: 'amenities',
      key: 'amenities',
      width: '130px',
      editable: true,
      render: (amenities) => (
        <>
          {amenities.map((tag) => (
            <Text key={tag}>{tag} </Text>
          ))}
          ,
        </>
      ),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: '130px',
      editable: true,
      render: (desc) => (
        <>
          <Text>{desc.substring(1, 40)} </Text>,
        </>
      ),
    },

    {
      title: 'Header Image',
      dataIndex: 'header_image',
      key: 'header_image',
      width: '130px',
      editable: true,
      render: (headerImage) => (
        <Image src={headerImage} className="table_image_gallery" />
      ),
    },
    {
      title: 'Days of Work',
      dataIndex: 'days_of_work',
      key: 'days_of_work',
      editable: true,
      width: '130px',
      render: (daysOfWork) => (
        <>
          {daysOfWork.map((tag) => (
            <Text key={tag}>{tag} </Text>
          ))}
        </>
      ),
    },
    {
      title: 'Image Gallery',
      dataIndex: 'image_gallery',
      key: 'image_gallery',
      editable: true,
      width: '130px',
      render: (gallery) => (
        <>
          {gallery.map((tag) => (
            <Image
              src={tag}
              key={tag}
              alt="gallery"
              className="table_image_gallery"
            />
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '130px',
      fixed: 'right',
      render: (_, record) => (
        <span>
          {allWorkspaces.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <MainButton
                style={{ backgroundColor: '#DA3743', border: 'none' }}
                icon={<DeleteOutlined style={{ color: '#FFFFFF' }} />}
              />
            </Popconfirm>
          ) : null}
          {isEditing(record) ? (
            <>
              <a
                href="#"
                onClick={() => save(record.id)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </>
          ) : (
            <MainButton
              onClick={() => edit(record)}
              disabled={editingKey !== ''}
              style={{
                backgroundColor: '#2A9835',
                border: 'none',
                marginLeft: '1px',
              }}
              icon={<EditOutlined style={{ color: '#FFFFFF' }} />}
            />
          )}
        </span>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'capacity' ||
          col.dataIndex === 'fees_per_day' ||
          col.dataIndex === 'fees_per_hour'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const fetchData = async () => {
    try {
      const data = await getAllWorkspaces();
      setAllWorkspaces(data);
      setIsLoading(false);
      setDeletePerformed(false);
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
  }, [deletePerformed, runEffect]);
  return (
    <div className="main-contain">
      <AdminNav />
      <div className="table_container">
        <Title level={2} className="table-title">
          All Workspaces
        </Title>
        {isLoading ? (
          <Loader size="large" />
        ) : (
          <div className="table-sub-container">
            <Form form={form} component={false}>
              <Table
                rowKey={(record) => record.id}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={allWorkspaces}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  pageSize: 4,
                  position: ['bottomRight'],
                }}
              />
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAllWorkspaces;
