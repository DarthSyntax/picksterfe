import React, { useContext } from 'react';
import './homepage-feed.css';
import Header from '../../components/header/header';
import ImageContainerFeed from '../../components/image-container-feed/image-container-feed';
import StateContext from '../../context';

const HomepageFeed = () => {
  const { currentUser } = useContext(StateContext);
  console.log(currentUser);
  return (
    <>
      <Header />
      <ImageContainerFeed />
    </>
  );
};

export default HomepageFeed;
