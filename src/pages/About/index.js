import React from 'react';
import { getSearchResults } from '../../firebase/firestore/workspace';

getSearchResults(null, 10).then((res) => console.log(res));
const About = () => (
  <div>
    <h1>Hi from About page</h1>
  </div>
);

export default About;
