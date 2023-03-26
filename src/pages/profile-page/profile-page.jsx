import { React, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile-page.css';
import Header from '../../components/header/header';
import StateContext from '../../context';
import FollowButton from '../../components/follow-button/follow-button';

const ProfilePage = () => {
  const {
    headers,
    setImageId,
    setOtherUser,
    setImage,
    setCaption,
    setComments,
    currentUser,
  } = useContext(StateContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [btnColor, setBtnColor] = useState('contained');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await fetch(
        `http://localhost:9000/api/v1/users/${
          window.location.href.split('/').slice(-1)[0]
        }`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const profileJson = await profileData.json();
      setUserProfile(profileJson.user);
      if (
        profileJson.user.followers.some(
          (follower) => follower._id === currentUser._id
        )
      ) {
        setBtnColor('outlined');
        setIsFollowing(true);
      } else {
        setBtnColor('contained');
        setIsFollowing(false);
      }
    };

    if (!loaded) {
      setLoaded(true);
      fetchProfileData();
    }
  }, [loaded, headers]);

  const handleClick = async function (e) {
    //When an image is clicked I want to go to the image component
    //and retrieve the info about the image from the database and display it there
    //console.log(e.target.src);
    setImage(e.target.src);
    setImageId(e.target.id);
    console.log('The id of the picture in the profile is ', e.target.src);
    try {
      const destination = await fetch(
        `http://localhost:9000/api/v1/pics/${e.target.src}`,
        {
          method: 'GET',
          headers: headers,
        }
      );
      const destinationJson = await destination.json();

      const commentArray = destinationJson.data.comments;

      setCaption(destinationJson.data.caption);

      if (commentArray) setComments(commentArray);

      const destinationUser = await fetch(
        `http://localhost:9000/api/v1/users/${destinationJson.data.user}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      const destinationUserJson = await destinationUser.json();

      //console.log(destinationUserJson);
      setOtherUser(destinationUserJson.user);
    } catch (err) {
      console.log(err);
    }

    navigate('/image');
  };

  return (
    <div>
      <Header />
      <div className='profile-info'>
        <img
          className='profile-photo'
          src={userProfile?.profilePic}
          alt={userProfile?.profilePic}
        />
        <h4>{userProfile?.username}</h4>
        <FollowButton
          isFollowing={isFollowing}
          btnColor={btnColor}
          setIsFollowing={setIsFollowing}
          setBtnColor={setBtnColor}
          className='follow-user'
        />
      </div>
      {/* <span>{userProfile.bio}</span> */}

      {userProfile?.pictures.map((imageItem, index) => (
        <img
          className='profile-image'
          src={imageItem}
          alt={imageItem}
          key={index}
          onClick={handleClick}
          user={userProfile.username}
        />
      ))}
    </div>
  );
};

export default ProfilePage;
