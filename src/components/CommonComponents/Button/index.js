import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const MainButton = ({
  onClick,
  buttName,
  id,
  className,
  htmlType,
  ...otherStyleProps
}) => (
  <Button
    id={id}
    className={className}
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
  className: '',
  htmlType: '',
};

MainButton.propTypes = {
  onClick: PropTypes.func,
  buttName: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  htmlType: PropTypes.string,
};

export default MainButton;
