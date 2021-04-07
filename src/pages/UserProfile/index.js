import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Image, Typography } from 'antd';

import { getUserById } from '../../firebase/firestore/user';
import getBookingByUserId from '../../firebase/firestore/booking';
import { getWorkspaceById } from '../../firebase/firestore/workspace';
// import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
import CardContainer from '../../components/CommonComponents/CardContainer';

import coverImage from '../../assets/images/backgound_cover.png';
import emailico from '../../assets/icons/email.svg';
import phoneico from '../../assets/icons/phone.svg';
import user from '../../assets/images/user.png';
import editico from '../../assets/icons/edit.svg';

import './style.css';

const { Title, Text } = Typography;

const UserProfile = ({ match }) => {
  const [userData, setUserData] = useState({});
  const [workspaceData, setWorkspaceData] = useState({});
  const { userId } = match.params;

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      const UserData = await getUserById(userId);
      setUserData(UserData);
      const bookingbyUserId = await getBookingByUserId(userId);
      const workspaceId = bookingbyUserId.workspace_id.id;
      const wsData = await getWorkspaceById(workspaceId);
      console.log('wsData', wsData);
      setWorkspaceData(wsData);
    }
    return () => {
      isActive = 'false';
    };
  }, []);
  console.log('statee', workspaceData);
  return (
    <div>
      <h1>hi from page</h1>
      <div className="profile-main-header">
        <div className="back-profile-header">
          <Image
            preview={false}
            src={coverImage}
            alt="profile background"
            className="background-image"
          />
          <div className="user-data">
            <div className="username-section">
              <Title className="username">{userData.name}</Title>
              <Image
                preview={false}
                src={editico}
                alt="edit button"
                className="edit"
              />
            </div>
            <div className="email-section">
              <Image preview={false} src={emailico} alt="email" />
              <Text className="email">{userData.email}</Text>
            </div>
            <div className="phone-section">
              <Image preview={false} src={phoneico} alt="phone" />
              <Text className="phone">{userData.phone_number}</Text>
            </div>
          </div>
        </div>
        <div className="front-profile-header">
          <Image
            preview={false}
            src={userData.image}
            alt="user image"
            className="userimage"
          />
        </div>
      </div>
      {/* <div className="user-ws-section"> */}
      {/* <Title>My workspace</Title>
      <WorkspaceCard /> */}
      <CardContainer
        title="My Workspace"
        size="large"
        data={[
          {
            name: workspaceData.name,
            feesPerDay: workspaceData.fees_per_day,
            feesPerHour: workspaceData.fees_per_hour,
            rating: workspaceData.rating,
            reviewers: workspaceData.reviewers,
            location: workspaceData.location,
            image: workspaceData.header_image,
          },
        ]}
      />
      {/* </div> */}
    </div>
  );
};
UserProfile.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};
export default UserProfile;
