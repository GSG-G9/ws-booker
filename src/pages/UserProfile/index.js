import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { message, Modal, Image, Button, Typography, Form, Divider } from 'antd';
import { EditOutlined, EditFilled } from '@ant-design/icons';

import firebaseConfig, { db } from '../../firebase/config';
import { EditUserData, getUserById } from '../../firebase/firestore/user';

import { getBookingByUserId } from '../../firebase/firestore/booking';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';

import coverImage from '../../assets/images/backgound_cover.png';
import emailico from '../../assets/icons/email.svg';
import phoneico from '../../assets/icons/phone.svg';

import './style.css';

const { Title, Text } = Typography;

const UserProfile = ({ match }) => {
  const [userData, setUserData] = useState({});
  const [fileURL, setFileURl] = useState('');
  const [image, setImage] = useState(null);
  const [workspaceData, setWorkspaceData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [runEffect, setRunEffect] = useState(false);

  const { userId } = match.params;
  const { name, phone_number } = userData;

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      const UserData = await getUserById(userId);
      if (UserData) {
        setUserData(UserData);
        const bookingbyUserId = await getBookingByUserId(userId);
        const workspaceId = bookingbyUserId.workspace_id.id;
        const wsData = await getWorkspaceById(workspaceId);
        setWorkspaceData(wsData);
      }
    }
    return () => {
      isActive = 'false';
    };
  }, [runEffect]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpload = async () => {
    try {
      if (image) {
        const storageRef = await firebaseConfig.storage().ref();
        const fileRef = storageRef.child(image.name);

        await fileRef.put(image);
        const url = await fileRef.getDownloadURL();
        setFileURl(url);
        const response = db.collection('users').doc(userId);
        const aa = await response.update({
          ...userData,
          image: url,
        });
        setRunEffect((x) => !x);
        return url;
      }
    } catch (err) {
      return err;
    }
  };

  const handleOk = async (values) => {
    setIsModalVisible(false);
    const { name: userName, phone_number: userPhone } = values;
    const ll = await EditUserData(userId, {
      ...userData,
      name: userName,
      phone_number: Number(userPhone),
    });
    const { data } = ll;
    setUserData(data);
    setIsUpdate(!isUpdate);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="profile-main-header">
        <div className="back-profile-header">
          <Image
            preview={false}
            src={coverImage}
            alt="profile background"
            className="background-image"
          />
          <div className="user-data">
            <div className="username-section">
              <Title className="username">{userData.name}</Title>
              <Button
                // onClick={() => setIsUpdate(!isUpdate)}
                onClick={showModal}
                type="primary"
                shape="circle"
                icon={<EditFilled />}
                className="edit"
              />
              {/* {isUpdate && (
                <Form
                  className="profile__form"
                  labelCol={{
                    span: 4,
                  }}
                  labelAlign="left"
                  initialValues={{
                    name,
                    phone_number,
                  }}
                  onFinish={(values) => handleOk(values)}
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    className="profile__input"
                  >
                    <MainInput prefix={<EditOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="phone_number"
                    label="phone_number"
                    className="profile__input"
                  >
                    <MainInput prefix={<EditOutlined />} />
                  </Form.Item>

                  <Button
                    type="primary"
                    className="profile__button--save"
                    onClick={() => setIsUpdate(false)}
                  >
                    cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="profile__button--save"
                  >
                    save
                  </Button>
                </Form>
              )} */}

              <Modal
                title="Update profile"
                visible={isModalVisible}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="upload-image-section">
                  <Text className="upload-label">Update Photo</Text>
                  <input type="file" onChange={handleChange} />
                  {/* <button onClick={handleUpload}>Upload</button> */}
                  <MainButton
                    buttName="Upload"
                    htmlType="submit"
                    onClick={handleUpload}
                  />
                </div>
                <Form
                  className="profile__form"
                  labelCol={{
                    span: 4,
                  }}
                  labelAlign="left"
                  initialValues={{
                    name,
                    phone_number,
                  }}
                  onFinish={(values) => handleOk(values)}
                >
                  <Form.Item
                    name="name"
                    // label="Name"
                    className="profile__input"
                  >
                    <MainInput prefix={<EditOutlined />} label="User Name" />
                  </Form.Item>
                  <Form.Item
                    name="phone_number"
                    // label="phone_number"
                    className="profile__input"
                  >
                    <MainInput prefix={<EditOutlined />} label="Phone Number" />
                  </Form.Item>
                  <div className="buttons-section">
                    <Button
                      type="primary"
                      className="profile__button--save"
                      // onClick={() => setIsUpdate(false)}
                      onClick={handleCancel}
                    >
                      cancel
                    </Button>

                    <Button
                      type="primary"
                      htmlType="submit"
                      className="profile__button--save"
                    >
                      save
                    </Button>
                  </div>
                </Form>
              </Modal>
            </div>
            <div className="email-section">
              <Image preview={false} src={emailico} alt="email" />
              <Text className="email">{userData.email}</Text>
            </div>
            <div className="phone-section">
              <Image preview={false} src={phoneico} alt="phone" />
              <Text className="phone">{userData.phone_number}</Text>
            </div>
          </div>
        </div>
        <div className="front-profile-header">
          <Image
            preview={false}
            src={userData.image}
            alt="user image"
            className="userimage"
          />
          {/* <input type="file" onChange={onFileChange} /> */}
          {/* <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
          </div> */}
        </div>
      </div>
      <div className="user-ws-section">
        <Title className="my-ws-title">My workspace</Title>
        <WorkspaceCard
          name={workspaceData.name}
          feesPerDay={workspaceData.fees_per_day}
          feesPerHour={workspaceData.fees_per_hour}
          rating={workspaceData.rating}
          reviewers={workspaceData.reviewers}
          location={workspaceData.location}
          image={workspaceData.header_image}
          buttonName="Cancel Book"
        />
      </div>
    </div>
  );
};
export default UserProfile;
