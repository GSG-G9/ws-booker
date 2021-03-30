import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const { Text, Title } = Typography;
const FeaturesCard = ({ icon, title, description }) => (
  <div className="features">
    <img src={icon} alt="features" id="image" />
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
