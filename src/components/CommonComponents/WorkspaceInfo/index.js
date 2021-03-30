import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const { Text } = Typography;

const WorkspaceInfo = ({ icon, text }) => (
  <div className="ws-info">
    <Image preview={false} src={icon} width={25} />
    <Text className="text">{text}</Text>
  </div>
);

WorkspaceInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default WorkspaceInfo;
