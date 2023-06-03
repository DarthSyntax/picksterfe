import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './image-container.css';
import StateContext from '../../context';
//import Image from '../image/image;';

const ImageContainer = () => {
  const navigate = useNavigate();
  const {
    setImage,
    setImageId,
    setOtherUser,
    setComments,
    caption,
    setCaption,
    headers,
  } = useContext(StateContext);

  const [images, setImages] = useState(null);
  let results;
  let resJson;

  useEffect(() => {
    async function fetchData() {
      try {
        results = await fetch('http://localhost:9000/api/v1/pics');
        resJson = await results.json();
        setImages(resJson);
      } catch (err) {
        console.log(err);
      }
    }
    if (images === null && navigate) {
      fetchData();
    }
  });

  const handleClick = async function (e) {
    //When an image is clicked I want to go to the image component
    //and retrieve the info about the image from the database and display it there
    setImage(e.target.src);
    setImageId(e.target.id);
    try {
      const destination = await fetch(
        `http://localhost:9000/api/v1/pics/${e.target.id}`,
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

    navigate(`/image/${e.target.id}`);
  };

  return (
    <div className='image-container'>
      {images?.data.map((imageItem, index) => (
        <img
          className='image'
          src={imageItem.image}
          alt={imageItem.image}
          key={index}
          onClick={handleClick}
          id={imageItem._id}
          user={imageItem.user}
        />
      ))}
    </div>
  );
};

export default ImageContainer;
