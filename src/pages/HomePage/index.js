import React from 'react';
import FeaturesCard from '../../components/CommonComponents/FeaturesCard';
import validate from '../../assets/icons/validate.svg';
import trust from '../../assets/icons/trust.svg';

const HomePage = () => (
  <div
    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
  >
    {/* <h1>Hi from home page</h1> */}
    <FeaturesCard
      icon={validate}
      title="Validate Spaces"
      description="Over 1000 spaces and meeting rooms, with more than 30 new spaces joining each month."
    />
    <FeaturesCard
      icon={validate}
      title="Validate Spaces"
      description="Over 1000 spaces and meeting rooms, with more than 30 new spaces joining each month."
    />
    <FeaturesCard
      icon={validate}
      title="Validate Spaces"
      description="Over 1000 spaces and meeting rooms, with more than 30 new spaces joining each month."
    />
  </div>
);

export default HomePage;
