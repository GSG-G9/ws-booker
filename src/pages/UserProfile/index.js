import Moment from 'moment';
import { extendMoment } from 'moment-range';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Image,
  Button,
  Typography,
  Form,
  Empty,
  Popconfirm,
} from 'antd';
import { EditOutlined, EditFilled } from '@ant-design/icons';
import calender from '../../assets/icons/calender.svg';
import persons from '../../assets/icons/persons.svg';
import time from '../../assets/icons/time.svg';
import firebaseConfig, { db } from '../../firebase/config';
import {
  EditUserData,
  getUserById,
  editUserCanBook,
} from '../../firebase/firestore/user';

import {
  getBookingByUserId,
  deleteBooking,
} from '../../firebase/firestore/booking';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import { AuthContext } from '../../firebase/context';
import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import Loader from '../../components/CommonComponents/Loader';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';

import coverImage from '../../assets/images/backgound_cover.png';
import emailico from '../../assets/icons/email.svg';
import phoneico from '../../assets/icons/phone.svg';

import './style.css';

const { Title, Text } = Typography;

const UserProfile = ({ match }) => {
  const [isUserLoader, setIsUserLoader] = useState(true);
  const [isWSLoader, setIsWSLoader] = useState(true);
  const [isUploadLoader, setIsUploadLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [fileURL, setFileURl] = useState('');
  const [image, setImage] = useState(null);
  const [workspaceData, setWorkspaceData] = useState({});
  const [wsId, setWsId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [runEffect, setRunEffect] = useState(false);
  const [error, setError] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingCapacity, setBookingCapacity] = useState('');

  const { setEditedImage, setEditedName } = useContext(AuthContext);
  const { userId } = match.params;
  const { name, phone_number } = userData;
  const moment = extendMoment(Moment);
  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      const UserData = await getUserById(userId);
      setIsUserLoader(false);
      if (UserData) {
        setUserData(UserData);
        const bookingbyUserId = await getBookingByUserId(userId);

        if (bookingbyUserId) {
          setBookingCapacity(bookingbyUserId.book_capacity.toString());
          const bookStart = bookingbyUserId.book_start_time.toDate();
          const startTime = moment(bookStart).format('HH:mm:ss');
          const startDate = moment(bookStart).format('MMM DD YYYY');

          const bookEnd = bookingbyUserId.book_end_time.toDate();
          const endTime = moment(bookEnd).format('HH:mm:ss');
          const endDate = moment(bookEnd).format('MMM DD YYYY');

          setBookingDate(`${startDate} - ${endDate}`);
          setBookingTime(`${startTime} - ${endTime}`);
          const workspaceId = bookingbyUserId.workspace_id.id;
          setWsId(workspaceId);
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
      let url;
      setIsUploadLoader(true);
      if (image) {
        const storageRef = await firebaseConfig.storage().ref();
        const fileRef = storageRef.child(image.name);

        await fileRef.put(image);
        url = await fileRef.getDownloadURL();
        setFileURl(url);
        setIsUploadLoader(false);
        const response = db.collection('users').doc(userId);
        await response.update({
          ...userData,
          image: url,
        });
        setRunEffect((x) => !x);
        setEditedImage(url);
      }
      return url;
    } catch (err) {
      return err;
    }
  };

  const handleOk = async (values) => {
    setIsModalVisible(false);
    const { name: userName, phone_number: userPhone } = values;
    const editResult = await EditUserData(userId, {
      ...userData,
      name: userName,
      phone_number: userPhone,
    });
    const { data } = editResult;
    setUserData(data);
    setEditedName(userName);
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
      await editUserCanBook(userId, { can_book: true });
      return { message: 'Cancel Booking successfully' };
    } catch (err) {
      return err;
    }
  };

  const confirm = () => {
    handleCancelBooking();
  };

  const cancel = () => {
    setConfirmVisible(false);
  };

  return (
    <div>
      <div className="profile-main-header">
        <div className="back-profile-header">
          <div className="user-background-img">
            <Image
              preview={false}
              src={coverImage}
              alt="profile background"
              className="background-image"
            />
          </div>
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
                    <Form.Item
                      name="name"
                      className="profile__input"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your user name!',
                        },
                      ]}
                    >
                      <MainInput prefix={<EditOutlined />} label="User Name" />
                    </Form.Item>
                    <Form.Item
                      name="phone_number"
                      className="profile__input"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone number!',
                        },
                      ]}
                    >
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
                {userData.phone_number ? (
                  <Text className="phone">{userData.phone_number}</Text>
                ) : (
                  <Text className="phone">No phone Number</Text>
                )}
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
        <div className="my-ws-title-container">
          <Title className="my-ws-title">My workspace</Title>
        </div>
        <div className="user-info-card-container">
          {error ? (
            <Empty description="Sorry! You don't have any workspace booking!" />
          ) : isWSLoader ? (
            <Loader />
          ) : (
            <div>
              <div className="user-details-card-container">
                <WorkspaceInfo icon={time} text={bookingTime} />
                <WorkspaceInfo icon={calender} text={bookingDate} />
                <WorkspaceInfo icon={persons} text={bookingCapacity} />
              </div>
              <Popconfirm
                title="Are you sure to delete the booking?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                visible={confirmVisible}
              >
                <WorkspaceCard
                  id={wsId}
                  name={workspaceData.name}
                  feesPerDay={workspaceData.fees_per_day}
                  feesPerHour={workspaceData.fees_per_hour}
                  rating={workspaceData.rating}
                  reviewers={workspaceData.reviewers}
                  location={workspaceData.location}
                  image={workspaceData.header_image}
                  buttonName="Cancel Book"
                  onClick={() => setConfirmVisible(true)}
                  cancel
                />
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UserProfile;
