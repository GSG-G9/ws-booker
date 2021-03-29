import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const { Text, Title } = Typography;
const FeaturesCard = ({ icon, title, description }) => (
  <div className="features">
    <Image preview={false} src={icon} width={100} height={100} />
    <Title level={3} id="title">
      {title}
    </Title>
    <Text className="text">{description}</Text>
  </div>
);

FeaturesCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default FeaturesCard;
