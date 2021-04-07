import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import Header from '../../components/Header';
import CardContainer from '../../components/CommonComponents/CardContainer';
import { getAllWorkspaces } from '../../firebase/firestore/workspace';
import Loader from '../../components/CommonComponents/Loader';

// getAllWorkspaces().then((res) => console.log(res));
const HomePage = () => {
  const [workspaceData, setWorkspaceData] = useState([]);
  const [first3Items, setFirst3Items] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchWorkspaceData = async () => {
    try {
      console.log('hi');
      const data = await getAllWorkspaces();
      console.log('data', data);
      const sortRes = data.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });
      setWorkspaceData(sortRes);
      setFirst3Items(workspaceData.slice(0, 3));
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
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <CardContainer
          title="Top Rated Workspaces"
          size="small"
          data={workspaceData}
        />
      )}
    </div>
  );
};

export default HomePage;
