import React from 'react';
import Header from '../../components/header/header';
import './explore.css';

import ImageContainer from '../../components/image-container/image-container';

//useEffect() to make a get request for all the pictures in the database by time created
// on the backend I'll want to filter out or only select images that aren't by the current user

const Explore = () => {
  return (
    <>
      <Header />
      <ImageContainer />
    </>
  );
};

export default Explore;
