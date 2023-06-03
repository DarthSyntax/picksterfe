import React, { useContext } from 'react';
import './follow-button.css';
import StateContext from '../../context';
import Button from '@mui/material/Button';

const FollowButton = ({
  isFollowing,
  setIsFollowing,
  btnColor,
  setBtnColor,
}) => {
  const { currentUser, otherUser, headers } = useContext(StateContext);

  const handleClick = async (e) => {
    e.preventDefault();

    /* if (!otherUser.followers.includes(currentUser)) {
      await fetch(`http://localhost:9000/api/v1/users/${otherUser._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          follower: {
            username: currentUser.username,
            _id: currentUser._id,
            profilePic: currentUser.profilePic,
          },
        }),
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFollowing(true);
          setBtnColor('outlined');
          console.log(
            `${currentUser.username} followed ${otherUser.username}`,
            data
          );
        });
    } */

    await fetch(`http://localhost:9000/api/v1/users/${otherUser._id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        follower: {
          username: currentUser.username,
          _id: currentUser._id,
          profilePic: currentUser.profilePic,
        },
      }),
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          !data.follower.following.some(
            (f) => f.username === otherUser.username
          )
        ) {
          setIsFollowing(true);
          setBtnColor('outlined');
          console.log(
            `${currentUser.username} followed ${otherUser.username}`,
            data
          );
        } else {
          setIsFollowing(false);
          setBtnColor('contained');
          console.log(
            `${currentUser.username} unfollowed ${otherUser.username}`
          );
        }
      });
  };

  return (
    <Button className='follow-button' variant={btnColor} onClick={handleClick}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
