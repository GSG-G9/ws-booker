import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from './config';
import { getUserById } from './firestore/user';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [editedImage, setEditedImage] = useState('');
  const [editedName, setEditedName] = useState('');

  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserById(userId);
      if (userData.isAdmin) {
        setIsAdmin(true);
      }
      setEditedName(userData.name);
      setEditedImage(userData.image);
      setIsAdminLoading(false);
      return userData;
    } catch (err) {
      setIsAdminLoading(false);
      return err;
    }
  };

  useEffect(async () => {
    let isActive = 'true';
    if (isActive) {
      try {
        firebase.auth().onAuthStateChanged((userAuth) => {
          setIsAdminLoading(true);
          if (userAuth) {
            setUser({
              id: userAuth.uid,
              name: userAuth.displayName,
              image: userAuth.photoURL,
              phone: userAuth.phoneNumber,
              email: userAuth.email,
            });
            fetchUserData(userAuth.uid);
          } else {
            setUser(userAuth);
            setIsAdminLoading(false);
          }
          setIsLoading(false);
        });
      } catch (err) {
        setError(err);
      }
    }
    return () => {
      isActive = 'false';
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        setError,
        isLoading,
        isAdmin,
        isAdminLoading,
        editedImage,
        setEditedImage,
        editedName,
        setEditedName,
        setIsAdminLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
