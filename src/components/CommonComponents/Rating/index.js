import React, { useState } from 'react';
import { Rate } from 'antd';

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
export default Rating;
