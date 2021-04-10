import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Upload, message, Modal, Image, Button, Typography } from 'antd';

import { EditFilled, UploadOutlined } from '@ant-design/icons';
import firebaseConfig, { db } from '../../firebase/config';
import { getUserById } from '../../firebase/firestore/user';
import getBookingByUserId from '../../firebase/firestore/booking';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import MainInput from '../../components/CommonComponents/Input';

import coverImage from '../../assets/images/backgound_cover.png';
import emailico from '../../assets/icons/email.svg';
import phoneico from '../../assets/icons/phone.svg';

import './style.css';

const { Title, Text } = Typography;

const UserProfile = ({ match }) => {
  const [fileURL, setFileURl] = useState(null);
  const [userData, setUserData] = useState({});
  const [workspaceData, setWorkspaceData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userId } = match.params;

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      const UserData = await getUserById(userId);
      setUserData(UserData);
      const bookingbyUserId = await getBookingByUserId(userId);
      const workspaceId = bookingbyUserId.workspace_id.id;
      const wsData = await getWorkspaceById(workspaceId);
      setWorkspaceData(wsData);
    }
    return () => {
      isActive = 'false';
    };
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileURl(await fileRef.getDownloadURL());
    db.collection('users').doc(userId).set({
      name: e.target.username.value,
      email: e.target.email.value,
      phone_number: e.target.phoneNumber.value,
      image: fileURL,
    });
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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
                onClick={showModal}
                type="primary"
                shape="circle"
                icon={<EditFilled />}
                className="edit"
              />
              <Modal
                title="Update profile"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <MainInput
                  placeholder="User Name"
                  value={userData.name}
                  label="User Name"
                  name="username"
                />
                <MainInput
                  placeholder="Email"
                  value={userData.email}
                  label="Email"
                  name="email"
                />
                <MainInput
                  placeholder="Phone Number"
                  value={userData.phone_number}
                  label="Phone Number"
                  name="phoneNumber"
                />
                <Upload {...props}>
                  <Button icon={<UploadOutlined />} onChange={onFileChange}>
                    Click to Upload
                  </Button>
                </Upload>
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
UserProfile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      userId: propTypes.string,
    }).isRequired,
  }).isRequired,
};
export default UserProfile;
