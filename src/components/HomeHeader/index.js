import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

import homeheader from '../../assets/images/homeheader.jpg';
import MainButton from '../CommonComponents/Button';
import MainInput from '../CommonComponents/Input';
import { createSearchUrl } from '../../utils';
import './style.css';

const HomeHeader = () => {
  const history = useHistory();
  const [city, setCity] = useState('');
  const [dateData, setDateData] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    console.log(6, city);
  };

  const handleDateChange = (date, dateString) => {
    setDateData(dateString);
    console.log('date data  ', dateData);
  };

  const handleNumberChange = (value) => {
    setNumberOfPeople(value);
    console.log('num', numberOfPeople);
  };

  const handleButtonClick = () => {
    const searchUrl = createSearchUrl(city, dateData, numberOfPeople);

    console.log(searchUrl);
    history.push(searchUrl);
  };
  return (
    <div>
      <div className="header_image ">
        <img src={homeheader} alt="ar" className="fill" />
      </div>
      <div className="outer_div">
        <p className="header_title"> The Future of Work has Arrived </p>
        <div className="search_div">
          <MainInput
            className="search_items"
            type="search"
            placeholder="Search by workspace name..."
            size="large"
            onChange={handleCityChange}
            style={{ width: '350px ', height: '85px', fontSize: '26px' }}
          />
          <MainInput
            className="search_items"
            type="date"
            placeholder="Start Date"
            size="large"
            onChange={handleDateChange}
            style={{ width: '215px ', height: '85px', fontSize: '26px' }}
          />
          <MainInput
            className="search_items"
            type="number"
            placeholder="Num of people"
            size="large"
            onChange={handleNumberChange}
            style={{ width: '215px ', height: '85px' }}
          />
          <MainButton
            buttName="Search"
            className="search_button"
            size="large"
            onClick={handleButtonClick}
            style={{ width: '200px ', height: '85px', fontSize: '26px' }}
            icon={<SearchOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
