import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from './config';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged(setIsSignedIn);
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        isSignedIn,
        error,
        setUserData,
        setIsSignedIn,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
