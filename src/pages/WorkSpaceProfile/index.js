import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Row, Col, Divider, Modal, Radio } from 'antd';
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
import { getWorkspaceById } from '../../firebase/firestore/workspace';
import './style.css';

const WorkspaceProfile = () => {
  const [rate, setRate] = useState();
  const [workspaceData, setWorkspaceData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const { workspaceId } = useParams();
  const [repeat, setRepeat] = useState('once');
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
    const startTime = Number(workspaceData.start_time.split(':')[0]);
    const endTime = Number(workspaceData.end_time.split(':')[0]);
    return arrayOfHours.filter(
      (n) => range(startTime, endTime).indexOf(n) === -1
    );
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
  useEffect(() => {
    let isActive = 'true';
    if (isActive) {
      fetchWorkspaceData(workspaceId);
    }
    return () => {
      isActive = 'false';
    };
  }, []);

  const onClick = () => {
    setVisible(true);
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
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={500}
          >
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
            />
            <Input
              type="time"
              label="Time"
              direction="row"
              containerClass="container"
              className="input-number"
              disabledHours={disabledHours}
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
            <Input
              disabled={repeat === 'once'}
              type="dateRange"
              label="Day"
              direction="row"
              containerClass="container"
              className="input-number"
              disabledDate={disabledDate}
            />
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
                          key={index}
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
