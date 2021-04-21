import React from 'react';
import { Image, Typography } from 'antd';
import oops from '../../assets/images/oops.png';
import './style.css';

const { Title, Text } = Typography;
const NotFount = () => (
  <div className="not-found-container">
    <Image preview={false} src={oops} alt="oops" />
    <Title>404</Title>
    <Title level={3}>Page Not Found</Title>
    <Text>We can not seem to find the page you are looking for!</Text>
  </div>
);

export default NotFount;
