import React, { useContext } from 'react';
import firebase from 'firebase';
import { Button } from 'antd';
import { AuthContext } from '../firebase/context';
import app from '../firebase/config';

export default function Signin() {
  const { userData, isSignedIn, setUserData, setIsSignedIn } = useContext(
    AuthContext
  );
  const xxx = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log();
        //   const token = result.credential.accessToken;
        const { user } = result;
        console.log(user.displayName);
        const data = {
          name: user.displayName,
        };
        // setUserData(user.displayName);
        setUserData({
          ...userData,
          name: user.displayName,
          id: user.uid,
          image: user.photoURL,
          email: user.email,
        });
        console.log(3, userData);
        // setIsSignedIn(true);
      })
      .catch((error) => error);
  };
  return (
    <div>
      <Button onClick={xxx}>click</Button>
      <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      {isSignedIn ? console.log(userData.name) : console.log('logged out ')}
    </div>
  );
}
