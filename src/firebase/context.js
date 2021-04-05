import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from './config';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged((userAuth) => {
        setUser(userAuth);
      });
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
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
