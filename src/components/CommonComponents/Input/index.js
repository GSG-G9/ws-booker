import React from 'react';
import { Input, InputNumber, DatePicker, TimePicker } from 'antd';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;

function MainInput({
  type,
  style,
  onChange,
  label,
  value,
  placeholder,
  size,
  className,
  id,
}) {
  switch (type) {
    case 'date':
      return (
        <>
          <RangePicker />
        </>
      );
    case 'time':
      return <TimePicker.RangePicker />;
    case 'number':
      return <InputNumber />;
    default:
      return <Input />;
  }
}

MainInput.propTypes = {
  size: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

MainInput.defaultProps = {
  size: 'middle',
  id: '',
  placeholder: '',
  label: '',
  type: '',
  className: '',
};

export default MainInput;
