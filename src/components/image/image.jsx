import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './image.css';
import StateContext from '../../context';
import CommentBlock from '../comment-block/comment-block';
import FollowButton from '../follow-button/follow-button';

const Image = ({ id, picUser, imageInfo }) => {
  const { currentUser, caption } = useContext(StateContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [btnColor, setBtnColor] = useState('blue');

  const navigate = useNavigate();

  const h5Ref = useRef(null);

  const handleProfileClick = function (event) {
    event.preventDefault();
    navigate(`/users/${h5Ref.current.innerText}`);
  };

  useEffect(() => {
    if (
      picUser?.followers.some(
        (follower) => follower._id === currentUser._id
      ) === true
    ) {
      setIsFollowing(true);
      setBtnColor('outlined');
    } else {
      setIsFollowing(false);
      setBtnColor('contained');
    }
  }, [isFollowing, currentUser, picUser]);

  return (
    <>
      <div className='user-container'>
        <div className='user'>
          <img
            className='profilepic'
            src={picUser?.profilePic}
            alt={picUser?.profilePic}
          />
          <h5 className='username' ref={h5Ref} onClick={handleProfileClick}>
            {picUser?.username}
          </h5>
        </div>
        <FollowButton
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          btnColor={btnColor}
          setBtnColor={setBtnColor}
        />
      </div>
      <div className='image-and-comments'>
        <img src={imageInfo?.image} alt={imageInfo?.image} id={id} />
        <span className='caption'>{caption}</span>
        <CommentBlock />
      </div>
    </>
  );
};

export default Image;
