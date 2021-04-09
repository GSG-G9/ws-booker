import React, { useState } from 'react';

import { Row, Col, Divider } from 'antd';
import Header from '../../components/Layout/Header';
import headerImg from '../../assets/images/homeheader.jpg';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';
import MainButton from '../../components/CommonComponents/Button';
import Rating from '../../components/CommonComponents/Rating';
import location from '../../assets/icons/location.svg';
import calender from '../../assets/icons/calender.svg';
import money from '../../assets/icons/money.svg';
import persons from '../../assets/icons/persons.svg';
import time from '../../assets/icons/time.svg';
import './style.css';

const WorkspaceProfile = () => {
  const [rate, setRate] = useState();
  return (
    <div>
      <Header />
      <Row>
        <Col span={24}>
          <img
            alt="header"
            src={headerImg}
            style={{ height: '700px', width: '100%', marginTop: '10px' }}
          />
        </Col>
      </Row>
      <Row justify="space-around" style={{ marginTop: '80px' }}>
        <Col span={0.5} />
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <div className="workspace-info-container" />
        </Col>
        <Col span={5}>
          <div className="booking-info-container">
            <MainButton
              buttName="Book Now"
              width="180px"
              fontWeight="bold"
              fontSize="20px"
              height="43px"
            />
            <div>
              <WorkspaceInfo
                icon={location}
                text="Sinaa Crossing (UNWRA HQ Square), Almotaz 3 Building 00970"
              />
              <WorkspaceInfo icon={time} text=" 09:00 - 05:00 " />
              <WorkspaceInfo icon={calender} text="Sun - Thu" />
              <WorkspaceInfo icon={persons} text="170 persons" />
              <WorkspaceInfo icon={money} text="₪ 20 - Day | ₪ 5 - Hour" />
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
        <Col span={0.5} />
      </Row>
    </div>
  );
};

export default WorkspaceProfile;
