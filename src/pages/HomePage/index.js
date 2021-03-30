import React from 'react';
import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import headerImage from '../../assets/images/homeheader.jpg';

const HomePage = () => (
  <div>
    <div style={{ display: 'flex' }}>
      <WorkspaceCard
        size="small"
        id={2}
        name="Gaza Sky Geeks"
        feesPerDay={20}
        feesPerHour={5}
        rating={3.5}
        reviewers={10}
        location="Gaza"
        image={headerImage}
      />
      <WorkspaceCard
        size="small"
        id={2}
        name="Gaza Sky Geeks"
        feesPerDay={20}
        feesPerHour={5}
        rating={3.5}
        reviewers={10}
        location="Gaza"
        image={headerImage}
      />
      <WorkspaceCard
        size="small"
        id={2}
        name="Gaza Sky Geeks"
        feesPerDay={20}
        feesPerHour={5}
        rating={3.5}
        reviewers={10}
        location="Gaza"
        image={headerImage}
      />
    </div>
    <p />
    <WorkspaceCard
      id={1}
      name="Gaza Sky Geeks"
      feesPerDay={20}
      feesPerHour={5}
      rating={3.5}
      location="Sina'a Crossing (UNWRA HQ Square), Almotaz 3 00970 "
      image={headerImage}
    />
    <h1>Hi from home page</h1>
  </div>
);

export default HomePage;
