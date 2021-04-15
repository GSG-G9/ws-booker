import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from 'antd';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import CardContainer from '../../components/CommonComponents/CardContainer';

const TopRatedWorkspaces = () => {
  const history = useHistory();
  const location = useLocation();
  const topRated = location.param1;
  const onFinish = ({ wsName }) => {
    const searchUrl = `/search?q=${wsName}`;
    history.push(searchUrl);
  };

  return (
    <div className="container">
      <div className="search_div_div">
        <Form layout="inline" name="search" onFinish={onFinish}>
          <Form.Item
            name="wsName"
            required
            rules={[{ required: true, message: 'Please enter city name' }]}
          >
            <MainInput placeholder="Enter City name" className="search_inp" />
          </Form.Item>
          <Form.Item>
            <MainButton
              buttName="Search"
              className="search_butt"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="card_container">
        <CardContainer
          title="Top Rated Workspaces"
          searchText="top-new"
          size="large"
          data={topRated}
        />
      </div>
    </div>
  );
};

export default TopRatedWorkspaces;
