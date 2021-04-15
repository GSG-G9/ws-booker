import React, { useState, useEffect } from 'react';
import { Modal, Image, Button, Typography, Form, Empty } from 'antd';
import { EditOutlined, EditFilled } from '@ant-design/icons';

import firebaseConfig, { db } from '../../firebase/config';
import { EditUserData, getUserById } from '../../firebase/firestore/user';

import {
  getBookingByUserId,
  deleteBooking,
} from '../../firebase/firestore/booking';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import Loader from '../../components/CommonComponents/Loader';

import coverImage from '../../assets/images/backgound_cover.png';
import emailico from '../../assets/icons/email.svg';
import phoneico from '../../assets/icons/phone.svg';

import './style.css';

const { Title, Text } = Typography;

const UserProfile = ({ match }) => {
  const [isUserLoader, setIsUsreLoader] = useState(true);
  const [isWSLoader, setIsWSLoader] = useState(true);
  const [isUploadLoader, setIsUploadLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [fileURL, setFileURl] = useState('');
  const [image, setImage] = useState(null);
  const [workspaceData, setWorkspaceData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [runEffect, setRunEffect] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = match.params;
  const { name, phone_number } = userData;

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      const UserData = await getUserById(userId);
      setIsUsreLoader(false);
      if (UserData) {
        setUserData(UserData);
        const bookingbyUserId = await getBookingByUserId(userId);
        if (bookingbyUserId) {
          const workspaceId = bookingbyUserId.workspace_id.id;
          const wsData = await getWorkspaceById(workspaceId);
          setIsWSLoader(false);
          setWorkspaceData(wsData);
        } else {
          setError("Sorry! You don't have any workspace booking!");
        }
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
      setIsUploadLoader(true);
      if (image) {
        const storageRef = await firebaseConfig.storage().ref();
        const fileRef = storageRef.child(image.name);

        await fileRef.put(image);
        const url = await fileRef.getDownloadURL();
        setFileURl(url);
        setIsUploadLoader(false);
        const response = db.collection('users').doc(userId);
        await response.update({
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
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(userId);
      setError("Sorry! You don't have any workspace booking!");
      return { message: 'Cancel Booking successfully' };
    } catch (err) {
      return err;
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

          {isUserLoader ? (
            <Loader />
          ) : (
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
                  footer={null}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div className="upload-image-section">
                    <Text className="upload-label">Update Photo</Text>
                    <input
                      type="file"
                      onChange={handleChange}
                      className="upload-input"
                    />
                    <MainButton
                      buttName="Upload"
                      htmlType="submit"
                      onClick={handleUpload}
                    />
                  </div>
                  <div className="view-updated-image">
                    {isUploadLoader ? (
                      <Loader />
                    ) : (
                      fileURL && (
                        <Image src={fileURL} alt="" className="image-view" />
                      )
                    )}
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
                    <Form.Item name="name" className="profile__input">
                      <MainInput prefix={<EditOutlined />} label="User Name" />
                    </Form.Item>
                    <Form.Item name="phone_number" className="profile__input">
                      <MainInput
                        prefix={<EditOutlined />}
                        label="Phone Number"
                      />
                    </Form.Item>
                    <div className="buttons-section">
                      <Button
                        type="primary"
                        className="profile-button-cancel"
                        onClick={handleCancel}
                      >
                        cancel
                      </Button>

                      <Button
                        type="primary"
                        htmlType="submit"
                        className="profile-button-save"
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
          )}
        </div>
        <div className="front-profile-header">
          {isUserLoader ? (
            <Loader />
          ) : (
            <Image
              preview={false}
              src={userData.image}
              alt="user image"
              className="userimage"
            />
          )}
        </div>
      </div>
      <div className="user-ws-section">
        <Title className="my-ws-title">My workspace</Title>
        {error ? (
          <Empty description="Sorry! You don't have any workspace booking!" />
        ) : isWSLoader ? (
          <Loader />
        ) : (
          <WorkspaceCard
            name={workspaceData.name}
            feesPerDay={workspaceData.fees_per_day}
            feesPerHour={workspaceData.fees_per_hour}
            rating={workspaceData.rating}
            reviewers={workspaceData.reviewers}
            location={workspaceData.location}
            image={workspaceData.header_image}
            buttonName="Cancel Book"
            onClick={handleCancelBooking}
          />
        )}
      </div>
    </div>
  );
};
export default UserProfile;
