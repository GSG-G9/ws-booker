import React, { useEffect, useState } from 'react';
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
    <AuthContext.Provider value={{ isSignedIn, error, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
