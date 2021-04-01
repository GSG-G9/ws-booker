import { Button } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/context';
import app from '../firebase/config';

export default function Nav() {
  // get the user state from context
  const { userData } = useContext(AuthContext);

  // if user exists, display user name and picture.
  // else, show a sign in button instead
  return (
    <div className="account">
      {userData ? (
        <div className="dropdown">
          <p>{`Welcome, ${userData.displayName}`}</p>
          <div className="dropdown-content">
            <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
          </div>
        </div>
      ) : (
        <Link to="/signin">
          <Button>SIGN IN/ REGISTER</Button>
        </Link>
      )}
    </div>
  );
}
