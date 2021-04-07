import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import homeheader from '../../assets/images/homeheader.jpg';
import MainButton from '../CommonComponents/Button';
import MainInput from '../CommonComponents/Input';
import './style.css';

const Header = () => (
  <div>
    <div className="header_image ">
      <img src={homeheader} alt="ar" className="fill" />
    </div>
    <p className="header_title"> The Future of Work has Arrived </p>
    <div className="search_div">
      <MainInput
        className="search_items"
        type="search"
        placeholder="Search by workspace name..."
        size="large"
        style={{ width: '350px ', height: '85px', fontSize: '26px' }}
      />
      <MainInput
        className="search_items"
        type="date"
        placeholder="Start Date"
        size="large"
        style={{ width: '215px ', height: '85px', fontSize: '26px' }}
      />
      <MainInput
        className="search_items"
        type="number"
        placeholder="Num of people"
        size="large"
        style={{ width: '215px ', height: '85px' }}
      />
      <MainButton
        buttName="Search"
        className="search_button"
        size="large"
        style={{ width: '200px ', height: '85px', fontSize: '26px' }}
        icon={<SearchOutlined />}
      />
    </div>
  </div>
);
export default Header;
