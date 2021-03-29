import React, { useState } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

const Rating = ({ rateValue, setRate }) => {
  const [value, setValue] = useState(0);

  const handleChange = (val) => {
    setValue(val);
    setRate(val);
  };

  return (
    <span>
      {rateValue === -1 ? (
        <Rate onChange={handleChange} value={value} />
      ) : (
        <Rate value={rateValue} />
      )}
    </span>
  );
};

Rating.defaultProps = {
  rateValue: -1,
  setRate: () => {},
};

Rating.propTypes = {
  rateValue: PropTypes.number,
  setRate: PropTypes.func,
};

export default Rating;
