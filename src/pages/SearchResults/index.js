import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { notification } from 'antd';
import Loader from '../../components/CommonComponents/Loader';
import MainInput from '../../components/CommonComponents/Input';
import MainButton from '../../components/CommonComponents/Button';
import CardContainer from '../../components/CommonComponents/CardContainer';
import { getSearchResults } from '../../firebase/firestore/workspace';
import './style.css';

const SearchResults = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [city, setCity] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const queryObj = {
    q: query.get('q'),
    dateData: query.get('dateData'),
    numberOfPeople: query.get('numberOfPeople'),
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleButtonClick = () => {
    const searchUrl = `/search?q=${city}`;
    history.push(searchUrl);
  };

  const fetchData = async () => {
    try {
      const data = await getSearchResults(queryObj.q, queryObj.numberOfPeople);

      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      notification.open({
        message: 'Something went wrong , Please try again',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div className="container">
      <div className="search_div">
        <MainInput
          placeholder="Enter City name"
          className="search_input"
          onChange={handleCityChange}
        />
        <MainButton
          buttName="Search"
          className="search_button"
          onClick={handleButtonClick}
        />
      </div>
      <div className="card_container">
        {isLoading ? (
          <Loader />
        ) : (
          <CardContainer
            title="Top Rated"
            searchText={queryObj.q || queryObj.numberOfPeople}
            size="large"
            data={searchResults}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
