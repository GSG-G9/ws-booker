import React, { useContext } from 'react';
import { AuthContext } from '../../firebase/context';

const About = () => {
  const { userData, isSignedIn, setUserData, setIsSignedIn } = useContext(
    AuthContext
  );
  return (
    <div>
      <h1>Hi from About page</h1>]{console.log(4, userData)}
    </div>
  );
};

export default About;
