import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

const { Text } = Typography;

const WorkspaceInfo = ({ icon, text, classname }) => (
  <div className={`ws-info ${classname}`}>
    <Image preview={false} src={icon} width={25} />
    <Text className="text">{text}</Text>
  </div>
);

WorkspaceInfo.defaultProps = {
  classname: 'ws-info',
};

WorkspaceInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classname: PropTypes.string,
};

export default WorkspaceInfo;
