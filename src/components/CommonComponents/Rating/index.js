import React, { useState } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

const Rating = ({ rateValue, setRate, onChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (val) => {
    setValue(val);
    setRate(val);
  };

  return (
    <span>
      {rateValue === -1 ? (
        <Rate
          onChange={(e) => {
            onChange(e);
            handleChange(e);
          }}
          value={value}
        />
      ) : (
        <Rate value={rateValue} />
      )}
    </span>
  );
};

Rating.defaultProps = {
  rateValue: -1,
  setRate: () => {},
  onChange: () => {},
};

Rating.propTypes = {
  rateValue: PropTypes.number,
  setRate: PropTypes.func,
  onChange: PropTypes.func,
};

export default Rating;
