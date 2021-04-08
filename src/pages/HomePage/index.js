import React, { useState, useEffect } from 'react';
import { message, Typography } from 'antd';
import HomeHeader from '../../components/HomeHeader';
import CardContainer from '../../components/CommonComponents/CardContainer';
import { getAllWorkspaces } from '../../firebase/firestore/workspace';
import Loader from '../../components/CommonComponents/Loader';
import FeaturesCard from '../../components/CommonComponents/FeaturesCard';
import validate from '../../assets/icons/validate.svg';
import trust from '../../assets/icons/trust.svg';
import free from '../../assets/icons/free.svg';
import { TopRatedWorkspaces } from '../../utils';

import './style.css';
// getAllWorkspaces().then((res) => console.log(res));
const { Title } = Typography;
const HomePage = () => {
  const [workspaceData, setWorkspaceData] = useState([]);
  const [topRatedWorkspace, setTopRatedWorkspace] = useState([]);
  const [newestWorkspace, setNewestWorkspace] = useState([]);
  const [firstTopItems, setFirstTopItems] = useState([]);
  const [firstNewest, setFirstNewest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchWorkspaceData = async () => {
    try {
      console.log('hi');
      const data = await getAllWorkspaces();
      console.log('data', data);
      const sortRated = data.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });
      setWorkspaceData(data);
      setTopRatedWorkspace(sortRated);
      setFirstTopItems(topRatedWorkspace.slice(0, 4));
      const sortNewest = data.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return -1;
        }
        if (a.created_at > b.created_at) {
          return 1;
        }
        return 0;
      });
      setNewestWorkspace(sortNewest);
      setFirstNewest(newestWorkspace.slice(0, 4));

      setIsLoading(false);
    } catch (err) {
      message.error('Something went wrong , Please try again');
    }
  };

  useEffect(() => {
    let isActive = 'true';
    if (isActive) {
      fetchWorkspaceData();
    }
    return () => {
      isActive = 'false';
    };
  }, []);
  return (
    <div>
      {console.log('hi')}
      <HomeHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CardContainer
            title="Top Rated Workspaces"
            size="small"
            seeMoreLink={TopRatedWorkspaces}
            data={firstTopItems}
          />
          <CardContainer
            title="Newest Workspaces"
            size="small"
            seeMoreLink={TopRatedWorkspaces}
            data={firstNewest}
          />
          <Title className="features_title">Why Book On WSBooker</Title>
          <div className="features_container">
            <FeaturesCard
              icon={validate}
              title="Validate Spaces"
              description="Over 1000 spaces and meeting rooms, with more than 30 new spaces joining each month."
            />
            <FeaturesCard
              icon={trust}
              title="Trusted"
              description="For Entrepreneurs to Fortune 100 companies, Coworker has over 3000 users."
            />
            <FeaturesCard
              icon={free}
              title="100% Free of charge"
              description="Over 100 spaces and meeting rooms, with more than 30 new spaces joining each month."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
