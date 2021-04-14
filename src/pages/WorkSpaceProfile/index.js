import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Row, Col, Divider, Modal, Radio, Popconfirm } from 'antd';
import firebase from 'firebase';
import { date } from 'yup';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';
import MainButton from '../../components/CommonComponents/Button';
import Input from '../../components/CommonComponents/Input';
import Rating from '../../components/CommonComponents/Rating';
import Loader from '../../components/CommonComponents/Loader';
import location from '../../assets/icons/location.svg';
import calender from '../../assets/icons/calender.svg';
import money from '../../assets/icons/money.svg';
import persons from '../../assets/icons/persons.svg';
import time from '../../assets/icons/time.svg';
import { AuthContext } from '../../firebase/context';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import { getUserById } from '../../firebase/firestore/user';
import { postBooking } from '../../firebase/firestore/booking';
import './style.css';

const WorkspaceProfile = () => {
  const [rate, setRate] = useState();
  const [workspaceData, setWorkspaceData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fullStartDate, setFullStartDate] = useState('');
  const [fullEndDate, setFullEndDate] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [userData, setUserData] = useState('');
  const { workspaceId } = useParams();
  const [repeat, setRepeat] = useState('once');
  const { user, setError, isLoading } = useContext(AuthContext);
  const moment = extendMoment(Moment);

  const handleRepeatChange = (e) => {
    setRepeat(e.target.value);
  };
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  }
  const arrayOfHours = Array.from(Array(24).keys());
  const arrayOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const disabledDays = (a1, a2) => {
    const disabledDaysArray = [];
    a1.forEach((n) => {
      if (a2.indexOf(n) === -1) {
        disabledDaysArray.push(a1.indexOf(n));
      }
    });
    return disabledDaysArray;
  };

  const disabledDate = (current) =>
    disabledDays(arrayOfDays, workspaceData.days_of_work).includes(
      Number(current.format('e'))
    ) ||
    (current && current < moment().endOf('day'));

  const disabledHours = () => {
    const start = Number(workspaceData.start_time.split(':')[0]);
    const end = Number(workspaceData.end_time.split(':')[0]);
    return arrayOfHours.filter((n) => range(start, end).indexOf(n) === -1);
  };
  console.log(workspaceData);
  const dateFormat = 'YYYY-MM-DD';
  console.log('hiiiiiiii', user);
  const handleChangeCapacity = (value) => {
    setCapacity(value);
  };
  const handleChangeDateRange = (e, string) => {
    console.log(e, string);
    setStartDate(string[0]);
    setEndDate(string[1]);
  };
  const handleChangeDate = (e, string) => {
    console.log(string);
    setStartDate(string);
  };
  const concatDate = (timePart, datePart) =>
    moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss').format();

  const handleChangeTime = (e, string) => {
    setStartTime(string[0]);
    setEndTime(string[1]);

    // console.log(e, string);
    // const datee = '2018-12-24';
    // const timee = '10:59:59';
    // const millisecondsEndTime = firebase.firestore.Timestamp.fromDate(
    //   new Date(dateTime)
    // );
    // console.log('pleaseee', millisecondsEndTime.toDate());
    // console.log('finalll', dateTime);
  };

  const fetchWorkspaceData = async (id) => {
    try {
      const data = await getWorkspaceById(id);
      setWorkspaceData(data);
      setIsLoaded(true);
    } catch (err) {
      return err;
    }
  };

  const fetchUserDate = async (id) => {
    try {
      if (user) {
        const getUserData = await getUserById(id);
        setUserData(getUserData);
      }
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    let isActive = 'true';
    if (isActive) {
      fetchWorkspaceData(workspaceId);
      if (user) {
        fetchUserDate(user.id);
      }
    }
    return () => {
      isActive = 'false';
    };
  }, [user]);

  const onClick = () => {
    setVisible(true);
  };
  const onOk = () => {
    console.log('onOk');
    setVisible(false);
  };
  const handleConfirmOk = () => {
    setConfirmVisible(false);
    setConfirmTitle('');
  };

  const onBook = () => {
    console.log(startDate);
    console.log(endDate);
    console.log(startTime);
    console.log('hahaha', endTime);
    const fullStart = concatDate(startTime, startDate);
    const fullEnd =
      repeat === 'once'
        ? concatDate(endTime, startDate)
        : concatDate(endTime, endDate);
    console.log('fulllll', fullStart, fullEnd);
    console.log('userrrr', userData);

    postBooking(user.id, workspaceId, {
      book_capacity: capacity,
      book_start_time: fullStart,
      book_end_time: fullEnd,
    })
      .then((data) => {
        if (data instanceof Error) {
          console.log(data.message);
          setConfirmTitle(data.message);
          setConfirmVisible(true);
        } else {
          console.log('dataaa boooking', data);
          setConfirmVisible(true);
          setConfirmTitle(data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <div>
          <Modal
            title="Booking"
            centered
            visible={visible}
            onOk={!user ? onOk : onBook}
            onCancel={() => setVisible(false)}
            width={500}
          >
            {!user ? (
              <p className="requirement-text">
                Please, Log in first before booking.
              </p>
            ) : !userData.can_book ? (
              <p className="requirement-text">
                Sorry, you have already booked a workspace
              </p>
            ) : (
              <div>
                <Popconfirm
                  title={confirmTitle}
                  visible={confirmVisible}
                  onConfirm={handleConfirmOk}
                />
                <p className="requirement-text">
                  Please enter your Requirements below:
                </p>
                <Input
                  type="number"
                  label="No. of People"
                  direction="row"
                  containerClass="container"
                  className="input-number"
                  max={workspaceData.capacity}
                  onChange={handleChangeCapacity}
                  value={capacity}
                />
                <Input
                  type="time"
                  label="Time"
                  direction="row"
                  containerClass="container"
                  className="input-number"
                  disabledHours={disabledHours}
                  onChange={handleChangeTime}
                />
                <div style={{ display: 'flex' }}>
                  <p className="repeat-text">Repeat</p>
                  <Radio.Group value={repeat} onChange={handleRepeatChange}>
                    <Radio.Button value="once" className="radio-button">
                      Once
                    </Radio.Button>
                    <Radio.Button value="daily" className="radio-button">
                      Daily
                    </Radio.Button>
                  </Radio.Group>
                </div>
                {repeat === 'once' ? (
                  <Input
                    type="date"
                    label="Day"
                    direction="row"
                    containerClass="container"
                    className="input-number"
                    disabledDate={disabledDate}
                    format={dateFormat}
                    onChange={handleChangeDate}
                  />
                ) : (
                  <Input
                    type="dateRange"
                    label="Day"
                    direction="row"
                    containerClass="container"
                    className="input-number"
                    disabledDate={disabledDate}
                    onChange={handleChangeDateRange}
                    format={dateFormat}
                  />
                )}
              </div>
            )}
          </Modal>
          <Row>
            <Col span={24}>
              <img
                alt="header"
                src={workspaceData.header_image}
                className="header-img"
              />
            </Col>
          </Row>
          <Row justify="space-around" className="main-container">
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className="workspace-info-container">
                <p className="name-text"> {isLoaded && workspaceData.name}</p>
                <div className="divider-container">
                  <Divider className="divider" />
                </div>
                <div className="rating">
                  <Rating rateValue={workspaceData.rating} />
                  <span className="rating-value-text">
                    {workspaceData.rating.toFixed(1)}
                  </span>
                </div>
                <p className="description-text">{workspaceData.description}</p>
                <p className="amenities-text">Amenities</p>
                <div className="small-divider-container">
                  <Divider className="divider" />
                </div>
                <div className="amenities-container">
                  {workspaceData.amenities.length ? (
                    workspaceData.amenities.map((item) => (
                      <div key={item} className="amenities-frame">
                        <p>{item}</p>
                      </div>
                    ))
                  ) : (
                    <p>No amenities</p>
                  )}
                </div>

                <p className="amenities-text">More Photos</p>
                <div className="small-divider-container">
                  <Divider className="divider" />
                </div>
                <div className="photos-container">
                  <img
                    alt="basic workspace"
                    className="basic-img"
                    src={workspaceData.image_gallery[0]}
                  />
                  <div className="small-photos-container">
                    {workspaceData.image_gallery ? (
                      workspaceData.image_gallery.map((item, index) => (
                        <img
                          key={index.toString}
                          alt="small workspace"
                          className="small-img"
                          src={item}
                        />
                      ))
                    ) : (
                      <p>No images</p>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={9}
              lg={7}
              xl={6}
              xxl={5}
              className="book-rate-container"
            >
              <div className="booking-info-container">
                <MainButton
                  buttName="Book Now"
                  className="book-btn"
                  onClick={onClick}
                />
                <div>
                  <WorkspaceInfo
                    icon={location}
                    text={workspaceData.location}
                  />
                  <WorkspaceInfo
                    icon={time}
                    text={`${workspaceData.start_time} - ${workspaceData.end_time}`}
                  />
                  <WorkspaceInfo
                    icon={calender}
                    text={`${workspaceData.days_of_work[0]} - ${
                      workspaceData.days_of_work[
                        workspaceData.days_of_work.length - 1
                      ]
                    }`}
                  />
                  <WorkspaceInfo
                    icon={persons}
                    text={`${workspaceData.capacity} Persons`}
                  />
                  <WorkspaceInfo
                    icon={money}
                    text={`₪ ${workspaceData.fees_per_day} - Day | ₪ ${workspaceData.fees_per_hour} - Hour`}
                  />
                </div>
              </div>
              <div className="rate-container">
                <p className="rate-text">Rate this Workspace</p>
                <div className="divider-container">
                  <Divider className="divider" />
                </div>
                <Rating setRate={setRate} />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default WorkspaceProfile;
