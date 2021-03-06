import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, message } from 'antd';
import Loader from '../../components/CommonComponents/Loader';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import CardContainer from '../../components/CommonComponents/CardContainer';
import { fetchSearchResults } from '../../firebase/firestore/workspace';
import './style.css';

const SearchResults = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const queryObj = {
    q: query.get('q'),
    city: query.get('city'),
    capacity: query.get('capacity'),
  };

  const onFinish = ({ wsName }) => {
    const searchUrl = `/search?q=${wsName}`;
    history.push(searchUrl);
  };

  const fetchData = async () => {
    try {
      const data = await fetchSearchResults(queryObj);
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      message.error('Something went wrong , Please try again');
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
  }, [query]);

  return (
    <div className="container">
      <div className="search_div_div">
        <Form layout="inline" name="search" onFinish={onFinish}>
          <Form.Item
            name="wsName"
            required
            rules={[{ required: true, message: 'Please enter workspace name' }]}
          >
            <MainInput
              placeholder="Enter workspace name"
              className="search_inp"
            />
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
        {isLoading ? (
          <Loader />
        ) : (
          <CardContainer
            title="Search Results For :"
            searchText={
              queryObj.q || queryObj.city || queryObj.capacity || 'Workspace'
            }
            search
            size="large"
            data={searchResults}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
