import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './image.css';
import StateContext from '../../context';
import CommentBlock from '../comment-block/comment-block';
import FollowButton from '../follow-button/follow-button';

const Image = () => {
  const { image, imageId, otherUser, comments, currentUser, caption } =
    useContext(StateContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [btnColor, setBtnColor] = useState('blue');

  const navigate = useNavigate();

  const h5Ref = useRef(null);

  const handleProfileClick = function (event) {
    event.preventDefault();
    navigate(`/users/${h5Ref.current.innerText}`);
  };

  //comments works as of 12/23 12:42 am
  console.log('The comments on the picture are', comments);
  console.log(otherUser);

  useEffect(() => {
    if (
      otherUser.followers.some(
        (follower) => follower._id === currentUser._id
      ) === true
    ) {
      setIsFollowing(true);
      setBtnColor('outlined');
    } else {
      setIsFollowing(false);
      setBtnColor('contained');
    }
  }, [isFollowing, currentUser, otherUser]);

  return (
    <>
      <div className='user'>
        <FollowButton
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          btnColor={btnColor}
          setBtnColor={setBtnColor}
        />
        <img
          className='profilepic'
          src={otherUser.profilePic}
          alt={otherUser.profilePic}
        />
        <h5 className='username' ref={h5Ref} onClick={handleProfileClick}>
          {otherUser.username}
        </h5>
      </div>
      <div className='image-and-comments'>
        <img src={image} alt={image} id={imageId} />
        <span className='caption'>{caption}</span>
        <CommentBlock />
      </div>
    </>
  );
};

export default Image;
