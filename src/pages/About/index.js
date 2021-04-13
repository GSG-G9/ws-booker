import React from 'react';
import { Typography } from 'antd';
import './style.css';

const { Title, Text } = Typography;

const About = () => (
  <div className="about-container">
    <div className="about-back-section">
      <div className="back-top-section">
        <Title className="about-first-title">
          Let Us Help you Find the Best Workspaces
        </Title>
        <Title level={2} className="about-second-title">
          Book it on WSbooker.com
        </Title>
      </div>
      <div className="back-bottom-section" />
    </div>
    <div className="about-front-section">
      <Title level={3} className="about-third-title">
        What is WSBooker?
      </Title>
      <Text>
        WSBooker is a website where you can search, find, and in some cases,
        reserve shared work space rentals near you in Gaza. Coworking spaces
        list their shared office rental options on WSBooker and outline what
        features and amenities their space can offer.
      </Text>
      <Text>
        Remote professionals and companies can then research and compare all of
        the different coworking spaces to find the one that will benefit their
        needs the most.
      </Text>
    </div>
  </div>
);

export default About;
