import React from 'react';
import WorkspaceInfo from '../../components/CommonComponents/WorkspaceInfo';
import location from '../../assets/icons/location.svg';
import time from '../../assets/icons/time.svg';
import calender from '../../assets/icons/calender.svg';
import persons from '../../assets/icons/persons.svg';
import money from '../../assets/icons/money.svg';

const HomePage = () => (
  <div>
    <h1>Hi from home page</h1>
    <WorkspaceInfo
      icon={location}
      text="Sina'a Crossing (UNWRA HQ Square), Almotaz 3 Building 00970 "
    />
    <WorkspaceInfo icon={time} text=" 09:00 - 05:00 " />
    <WorkspaceInfo icon={calender} text="Sun - Thu" />
    <WorkspaceInfo icon={persons} text="170 person" />
    <WorkspaceInfo icon={money} text="₪ 20 - Day   |   ₪ 5 - Hour" />
  </div>
);

export default HomePage;
