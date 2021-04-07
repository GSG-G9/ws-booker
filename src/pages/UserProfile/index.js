import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Image, Typography } from 'antd';

import { getUserById } from '../../firebase/firestore/user';

import WorkspaceCard from '../../components/CommonComponents/WorkspaceCard';
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
  const { userId } = match.params;
  console.log('userrrrr', userId);

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      // const UserData = await getUserById('TiXV6ZR2z4YKB5ovaGmm287iqF83');
      const UserData = await getUserById();
      console.log('data', UserData);
      setUserData(UserData);
    }
    return () => {
      isActive = 'false';
    };
  }, []);
  console.log('Stat222222e', userData);
  return (
    <div>
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
              <Title className="username">Sara Ahmed</Title>
              <Image
                preview={false}
                src={editico}
                alt="edit button"
                className="edit"
              />
            </div>
            <div className="email-section">
              <Image preview={false} src={emailico} alt="email" />
              <Text className="email">sara@gmail.com</Text>
            </div>
            <div className="phone-section">
              <Image preview={false} src={phoneico} alt="phone" />
              <Text className="phone">0599123456</Text>
            </div>
          </div>
        </div>
        <div className="front-profile-header">
          <Image
            preview={false}
            src={user}
            alt="user image"
            className="userimage"
          />
        </div>
      </div>
      <div className="user-ws-section">
        {/* <Title>My workspace</Title>
      <WorkspaceCard /> */}
        {/* <CardContainer title="My Workspace" size="large"  data={
          size= 'large',
          id='editbtn',
          name = '',
          image,
          feesPerDay,
          feesPerHour,
          location,
          rating,
          reviewers,
      }/> */}
      </div>
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
