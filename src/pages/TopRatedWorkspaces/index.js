import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { notification, Form } from 'antd';
import Loader from '../../components/CommonComponents/Loader';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import CardContainer from '../../components/CommonComponents/CardContainer';
import { getAllWorkspaces } from '../../firebase/firestore/workspace';
import './style.css';

const TopRatedWorkspaces = () => {
  const history = useHistory();

  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onFinish = ({ wsName }) => {
    const searchUrl = `/search?q=${wsName}`;
    history.push(searchUrl);
  };

  const fetchData = async () => {
    try {
      const data = await getAllWorkspaces();
      data.sort((a, b) => b.rating - a.rating);
      setTopRated(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      notification.open({
        message: 'Something went wrong , Please try again',
      });
    }
  };

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      fetchData();
    }
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="container">
      <div className="search_div">
        <Form layout="inline" name="search" onFinish={onFinish}>
          <Form.Item
            name="wsName"
            required
            rules={[{ required: true, message: 'Please enter city name' }]}
          >
            <MainInput placeholder="Enter City name" className="search_input" />
          </Form.Item>
          <Form.Item>
            <MainButton
              buttName="Search"
              className="search_button"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </div>
      <div className="card_container">
        {isLoading ? (
          <Loader />
        ) : (
          <CardContainer
            title="Top Rated Workspaces"
            searchText="top-new"
            size="large"
            data={topRated}
          />
        )}
      </div>
    </div>
  );
};

export default TopRatedWorkspaces;
