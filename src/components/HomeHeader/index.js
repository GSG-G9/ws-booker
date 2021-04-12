import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import MainButton from '../CommonComponents/Button';
import MainInput from '../CommonComponents/Input';
import { createSearchUrl } from '../../utils';
import './style.css';

const { Title } = Typography;
const HomeHeader = () => {
  const history = useHistory();
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(0);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNumberChange = (value) => {
    setCapacity(value);
  };

  const handleButtonClick = () => {
    const searchUrl = createSearchUrl(name, city, capacity);
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
            placeholder="Search by Workspace name..."
            size="large"
            onChange={handleNameChange}
          />
          <MainInput
            className="search_items search_input"
            placeholder="Search by city name..."
            prefix={<AimOutlined style={{ color: '#929292' }} />}
            size="large"
            onChange={handleCityChange}
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
