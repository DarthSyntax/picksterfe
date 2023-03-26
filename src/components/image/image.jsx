import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './image.css';
import StateContext from '../../context';
import CommentBlock from '../comment-block/comment-block';
import FollowButton from '../follow-button/follow-button';

const Image = ({id, picUser, imageInfo}) => {
  const { image, otherUser, comments, currentUser, caption, setOtherUser, setComments, headers, setImage } =
    useContext(StateContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [btnColor, setBtnColor] = useState('blue');
  // const [imageInfo, setImageInfo] = useState(null);
  // const [picUser, setPicUser] = useState(null);

  const navigate = useNavigate();

  const h5Ref = useRef(null);

  const handleProfileClick = function (event) {
    event.preventDefault();
    navigate(`/users/${h5Ref.current.innerText}`);
  };

  //comments works as of 12/23 12:42 am
  // console.log('The comments on the picture are', comments);
  // console.log(otherUser);

  useEffect(() => {
    // const getImage = async () => {
    //   const res = await fetch(`http://localhost:9000/api/v1/pics/${id}`, {
    //     method: 'GET',
    //     headers: headers,
    //   })

    //   const imageJson = await res.json();

    //   const resUser = await fetch(`http://localhost:9000/api/v1/users/${imageJson.data.user}`, {
    //     method: 'GET',
    //     headers: headers,
    //   })

    //   const userJson = await resUser.json();

    //   setImageInfo(imageJson.data);
    //   setPicUser(userJson.data.user);
    //   console.log(imageJson, userJson);
      
    // }

    // if(!picUser || !imageInfo) getImage();
    
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
      <div className='user'>
        <FollowButton
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          btnColor={btnColor}
          setBtnColor={setBtnColor}
        />
        <img
          className='profilepic'
          src={picUser?.profilePic}
          alt={picUser?.profilePic}
        />
        <h5 className='username' ref={h5Ref} onClick={handleProfileClick}>
          {picUser?.username}
        </h5>
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
