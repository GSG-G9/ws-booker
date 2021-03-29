import React from 'react';
import { Input, InputNumber, DatePicker, TimePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './style.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const TimeRange = TimePicker.RangePicker;
const { Password } = Input;

function MainInput({
  type,
  label,
  max,
  value,
  onChange,
  placeholder,
  labelPosition,
  rows,
  containerClass,
  direction,
  height,
  style,
  ...restProps
}) {
  // let labelType;
  // // eslint-disable-next-line no-unused-expressions
  // label &&
  //   (labelPosition === 'left'
  //     ? (labelType = <span className="label">{label}</span>)
  //     : (labelType = <p className="label">{label}</p>));
  let input;

  switch (type) {
    case 'dateRange':
      input = (
        <RangePicker
          style={{ height: '55px' }}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    case 'date':
      input = (
        <DatePicker
          style={{ height: '55px' }}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    case 'time':
      input = (
        <TimeRange
          style={{ height: '55px' }}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    case 'number':
      input = (
        <InputNumber
          style={{ height: '55px', lineHeight: '55px' }}
          min={1}
          max={max}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    case 'textArea':
      input = (
        <TextArea
          style={{ height: '55px' }}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    case 'search':
      input = (
        <Input
          style={{ height: '55px' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
          prefix={<SearchOutlined style={{ color: '#929292' }} />}
        />
      );
      break;
    case 'password':
      input = (
        <Password
          style={{ height: '55px' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
      break;
    default:
      input = (
        <Input
          style={{ height: '55px' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />
      );
  }
  return (
    <div
      className={containerClass}
      style={{
        display: 'flex',
        flexDirection: direction,
      }}
    >
      <span className="label">{label}</span>
      {input}
    </div>
  );
}

MainInput.propTypes = {
  max: PropTypes.number,
  direction: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

MainInput.defaultProps = {
  labelPosition: '',
  direction: 'column',
  max: '1000',
  rows: '3',
  placeholder: '',
  label: '',
  type: '',
};

export default MainInput;
