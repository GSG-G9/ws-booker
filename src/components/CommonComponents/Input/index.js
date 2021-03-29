import React from 'react';
import { Input, InputNumber, DatePicker, TimePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const TimeRange = TimePicker.RangePicker;

function MainInput({
  type,
  label,
  max,
  value,
  onChange,
  placeholder,
  labelPosition,
  rows,
  ...restProps
}) {
  let labelType;
  // eslint-disable-next-line no-unused-expressions
  label &&
    (labelPosition === 'left'
      ? (labelType = <span>{label}</span>)
      : (labelType = <p>{label}</p>));

  switch (type) {
    case 'dateRange':
      return (
        <>
          {labelType}
          <RangePicker value={value} onChange={onChange} {...restProps} />
        </>
      );
    case 'date':
      return (
        <>
          {labelType}
          <DatePicker value={value} onChange={onChange} {...restProps} />
        </>
      );
    case 'time':
      return (
        <>
          {labelType}
          <TimeRange value={value} onChange={onChange} {...restProps} />
        </>
      );
    case 'number':
      return (
        <>
          {labelType}
          <InputNumber
            min={1}
            max={max}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...restProps}
          />
        </>
      );
    case 'textArea':
      return (
        <>
          {labelType}
          <TextArea
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...restProps}
          />
        </>
      );

    case 'search':
      return (
        <>
          {label && <span>{label}</span>}
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...restProps}
            prefix={<SearchOutlined style={{ color: '#929292' }} />}
          />
        </>
      );
    default:
      return (
        <>
          {label && <span>{label}</span>}
          <Input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...restProps}
          />
        </>
      );
  }
}

MainInput.propTypes = {
  max: PropTypes.number,
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
  max: '1000',
  rows: '3',
  placeholder: '',
  label: '',
  type: '',
};

export default MainInput;
