import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const MainButton = ({
  onClick,
  buttName,
  id,
  type,
  icon,
  className,
  htmlType,
  ...otherStyleProps
}) => (
  <Button
    id={id}
    className={className}
    type={type}
    icon={icon}
    onClick={onClick}
    htmlType={htmlType}
    style={otherStyleProps}
  >
    {buttName}
  </Button>
);

MainButton.defaultProps = {
  onClick: () => {},
  buttName: 'Search',
  id: '',
  type: 'primary',
  icon: '',
  className: '',
  htmlType: '',
};

MainButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  buttName: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  htmlType: PropTypes.string,
};

export default MainButton;
