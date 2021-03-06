import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const Loader = ({ size }) => <Spin size={size} style={{ display: 'block' }} />;

Loader.defaultProps = {
  size: 'large',
};

Loader.propTypes = {
  size: PropTypes.string,
};

export default Loader;
