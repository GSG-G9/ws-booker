import React from 'react';
import { useHistory } from 'react-router-dom';
import { SearchOutlined, AimOutlined } from '@ant-design/icons';
import { Typography, notification, Form } from 'antd';
import MainButton from '../CommonComponents/Button';
import MainInput from '../CommonComponents/Input';
import { createSearchUrl } from '../../utils';
import './style.css';

const { Title } = Typography;
const HomeHeader = () => {
  const history = useHistory();

  const onFinish = ({ q, city, capacity }) => {
    if (q || city || capacity) {
      const searchUrl = createSearchUrl(q, city, capacity);
      history.push(searchUrl);
    } else {
      notification.warning({
        message: 'Empty search values',
        description: 'Please , enter at least one search value',
      });
    }
  };

  return (
    <div>
      <div className="header_image ">
        <Title className="header_title"> The Future of Work has Arrived </Title>
        <div className="search_div">
          <Form layout="inline" onFinish={onFinish}>
            <Form.Item name="q">
              <MainInput
                className="search_items search_input"
                type="search"
                placeholder="Search by Workspace name..."
                size="large"
              />
            </Form.Item>
            <Form.Item name="city">
              <MainInput
                className="search_items search_input"
                placeholder="Search by city name..."
                prefix={<AimOutlined style={{ color: '#929292' }} />}
                size="large"
              />
            </Form.Item>
            <Form.Item name="capacity">
              <MainInput
                className="search_items number_input"
                type="number"
                placeholder="Num of people"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <MainButton
                buttName="Search"
                className="search_button"
                size="large"
                htmlType="submit"
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
