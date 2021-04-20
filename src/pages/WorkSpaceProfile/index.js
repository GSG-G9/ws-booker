import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
  Row,
  Col,
  Divider,
  Modal,
  Radio,
  Popconfirm,
  message,
  Tooltip,
} from 'antd';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';
import MainButton from '../../components/CommonComponents/Button';
import Input from '../../components/CommonComponents/Input';
import Rating from '../../components/CommonComponents/Rating';
import Loader from '../../components/CommonComponents/Loader';
import check from '../../assets/icons/check.svg';
import location from '../../assets/icons/location.svg';
import pin from '../../assets/icons/pin.svg';
import calender from '../../assets/icons/calender.svg';
import money from '../../assets/icons/money.svg';
import persons from '../../assets/icons/persons.svg';
import time from '../../assets/icons/time.svg';
import { AuthContext } from '../../firebase/context';
import {
  getWorkspaceById,
  editWorkspaceRating,
  editWorkspace,
} from '../../firebase/firestore/workspace';
import { getUserById, editUserCanBook } from '../../firebase/firestore/user';
import { postBooking } from '../../firebase/firestore/booking';
import loginWithGoogle from '../../Login/loginWithGoogle';
import {
  addRating,
  getRatingByWorkspaceId,
} from '../../firebase/firestore/rating';

import './style.css';

const WorkspaceProfile = () => {
  const [rate, setRate] = useState(0);
  const [workspaceData, setWorkspaceData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [capacity, setCapacity] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const [dateRangeValue, setDateRangeValue] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [userData, setUserData] = useState('');
  const { workspaceId } = useParams();
  const [repeat, setRepeat] = useState('once');
  const [capacityError, setCapacityError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [runEffect, setRunEffect] = useState(false);
  const { user, setError } = useContext(AuthContext);
  const moment = extendMoment(Moment);
  editWorkspaceRating(workspaceId).then((res) => console.log(res));
  const arrayOfHours = Array.from(Array(24).keys());
  const arrayOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  getRatingByWorkspaceId(workspaceId).then((res) => console.log(res));
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };
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
  const concatDate = (timePart, datePart) =>
    moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss').format();
  const dateFormat = 'YYYY-MM-DD';

  const calculateHours = (start, end) => {
    const tStart = moment(start, 'h:mm:ss');
    const tEnd = moment(end, 'h:mm:ss');
    return moment.duration(tEnd.diff(tStart)).asHours();
  };

  const handleChangeCapacity = (value) => {
    setCapacityError(null);
    setCapacity(value);
  };
  const handleChangeDateRange = (e, string) => {
    setDateRangeValue(e);
    setDateError(null);
    setStartDate(string[0]);
    setEndDate(string[1]);
  };
  const handleChangeDate = (e, string) => {
    setDateValue(e);
    setDateError(null);
    setStartDate(string);
  };
  const handleChangeTime = (e, string) => {
    setTimeValue(e);
    setTimeError(null);
    setStartTime(string[0]);
    setEndTime(string[1]);
  };
  const handleRepeatChange = (e) => {
    setRepeat(e.target.value);
    setStartDate(null);
    setDateValue(null);
    setDateRangeValue(null);
  };

  const handleRating = async (val) => {
    try {
      setRate(val);
      console.log('rate', rate);

      const resultMsg = await addRating({ userId: user.id, workspaceId, rate });
      console.log(resultMsg);
      return null;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const fetchWorkspaceData = async (id) => {
    try {
      const data = await getWorkspaceById(id);
      setWorkspaceData(data);
      setIsLoaded(true);
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchUserDate = async (id) => {
    try {
      const getUserData = await getUserById(id);
      setUserData(getUserData);
      return getUserData;
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
  }, [user, runEffect]);

  const onClick = () => {
    setVisible(true);
  };
  const onOk = () => {
    setVisible(false);
  };
  const handleConfirmOk = () => {
    setConfirmVisible(false);
    setConfirmTitle('');
  };
  const handleConfirmCancel = () => {
    setConfirmVisible(false);
    setConfirmTitle('');
  };
  const cancelBooking = () => {
    setCapacity(null);
    setDateRangeValue(null);
    setDateValue(null);
    setTimeValue(null);
    setRepeat('once');
    setVisible(false);
    setConfirmVisible(false);
  };
  const handleOnLoginClick = async () => {
    try {
      setVisible(false);
      await loginWithGoogle();
    } catch (err) {
      setError(err);
    }
  };

  const onBook = async () => {
    try {
      let response;
      if (!capacity) {
        setCapacityError('Please select capacity!');
      }
      if (!startTime) {
        setTimeError('Please select time!');
      }
      if (!startDate) {
        setDateError('Please select date!');
      }
      if (capacity && startTime && startDate) {
        if (calculateHours(startTime, endTime) < 1) {
          setTimeError('Booking time should be more than one hour');
        } else {
          setConfirmLoading(true);
          const fullStart = concatDate(startTime, startDate);
          const fullEnd =
            repeat === 'once'
              ? concatDate(endTime, startDate)
              : concatDate(endTime, endDate);

          const result = await postBooking(user.id, workspaceId, {
            book_capacity: capacity,
            book_start_time: fullStart,
            book_end_time: fullEnd,
          });
          response = result;
          if (result instanceof Error) {
            setConfirmLoading(false);
            setConfirmTitle('Something went wrong, please try again');
            setConfirmVisible(true);
          } else if (!result.succeed) {
            setConfirmLoading(false);
            setConfirmVisible(true);
            setConfirmTitle(result.msg);
          } else {
            await editUserCanBook(user.id, { can_book: false });
            setConfirmLoading(false);
            setVisible(false);

            message.success('Your Booking has been added successfully');
            setRunEffect((x) => !x);
          }
        }
      }
      return response;
    } catch (err) {
      return err;
    }
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
            onOk={
              !user ? handleOnLoginClick : !userData.can_book ? onOk : onBook
            }
            onCancel={cancelBooking}
            cancelButtonProps={
              user && !userData.can_book && { style: { display: 'none' } }
            }
            confirmLoading={confirmLoading}
            width={500}
            okText={
              !user ? 'Log In with Google' : !userData.can_book ? 'Ok' : 'Book'
            }
          >
            {!user ? (
              <>
                <p className="requirement-text">
                  Please, Log in first before booking.
                </p>
              </>
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
                  onCancel={handleConfirmCancel}
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
                <div
                  style={{
                    height: '20px',
                    marginTop: '10px',
                  }}
                >
                  {capacityError && (
                    <span className="error-text">{capacityError}</span>
                  )}
                </div>
                <Input
                  type="time"
                  label="Time"
                  direction="row"
                  containerClass="container"
                  className="input-number"
                  disabledHours={disabledHours}
                  onChange={handleChangeTime}
                  value={timeValue}
                  showTime={{
                    hideDisabledOptions: true,
                  }}
                />
                <div
                  style={{
                    height: '20px',
                    marginTop: '10px',
                  }}
                >
                  {timeError && <span className="error-text">{timeError}</span>}
                </div>
                <div style={{ display: 'flex' }}>
                  <p className="repeat-text">Repeat</p>
                  <Radio.Group value={repeat} onChange={handleRepeatChange}>
                    <Radio.Button
                      value="once"
                      className="radio-button-workspace"
                    >
                      Once
                    </Radio.Button>
                    <Radio.Button
                      value="daily"
                      className="radio-button-workspace"
                    >
                      Daily
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div
                  style={{
                    height: '20px',
                    marginTop: '10px',
                  }}
                />
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
                    value={dateValue}
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
                    value={dateRangeValue}
                  />
                )}
                <div
                  style={{
                    height: '20px',
                    marginTop: '10px',
                  }}
                >
                  {dateError && <span className="error-text">{dateError}</span>}
                </div>
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
                      <WorkspaceInfo key={item} icon={check} text={item} />
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
                          key={index.toString()}
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
                  <WorkspaceInfo icon={pin} text={workspaceData.city} />
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

                {!user ? (
                  <Tooltip title="Please Log in to add your review">
                    <div className="set-rate-container">
                      <Rating rateValue={0} />
                    </div>
                  </Tooltip>
                ) : (
                  <div className="set-rate-container">
                    <Rating setRate={(val) => handleRating(val)} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default WorkspaceProfile;
