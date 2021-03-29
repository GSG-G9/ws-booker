import React from 'react';
import { Image, Typography } from 'antd';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';

import './style.css';

const { Text } = Typography;

const WorkspaceInfo = ({ icon, text }) => (
  <div className="ws-info">
    <Image preview={false} src={icon} width={30} />
    <p className="text">{text}</p>
  </div>
);

WorkspaceInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default WorkspaceInfo;
