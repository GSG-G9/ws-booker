import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';
import MainButton from '../../components/CommonComponents/Button';
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
  const { workspaceId } = useParams();

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
  return (
    <div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <div>
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
                <MainButton buttName="Book Now" className="book-btn" />
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
                <div className="set-rate-container">
                  <Rating setRate={setRate} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default WorkspaceProfile;
