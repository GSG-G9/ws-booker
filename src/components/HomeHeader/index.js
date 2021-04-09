import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import MainButton from '../CommonComponents/Button';
import MainInput from '../CommonComponents/Input';
import { createSearchUrl } from '../../utils';
import './style.css';

const { Title } = Typography;
const HomeHeader = () => {
  const history = useHistory();
  const [city, setCity] = useState('');
  const [dateData, setDateData] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setDateData(dateString);
  };

  const handleNumberChange = (value) => {
    setNumberOfPeople(value);
  };

  const handleButtonClick = () => {
    const searchUrl = createSearchUrl(city, dateData, numberOfPeople);
    history.push(searchUrl);
  };
  return (
    <div>
      <div className="header_image ">
        <Title className="header_title"> The Future of Work has Arrived </Title>
        <div className="search_div">
          <MainInput
            className="search_items search_input"
            type="search"
            placeholder="Search by workspace name..."
            size="large"
            onChange={handleCityChange}
          />
          <MainInput
            className="search_items date_input"
            type="date"
            placeholder="Start Date"
            size="large"
            onChange={handleDateChange}
          />
          <MainInput
            className="search_items number_input"
            type="number"
            placeholder="Num of people"
            size="large"
            onChange={handleNumberChange}
          />
          <MainButton
            buttName="Search"
            className="search_button"
            size="large"
            onClick={handleButtonClick}
            icon={<SearchOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
