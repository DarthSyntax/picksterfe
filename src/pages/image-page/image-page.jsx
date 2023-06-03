import React, { useState, useEffect, useContext } from 'react';
import './image-page.css';
import Image from '../../components/image/image';
import { useParams } from 'react-router-dom';
import StateContext from '../../context';

const ImagePage = () => {
  const { imageId: id } = useParams();
  const [imageInfo, setImageInfo] = useState(null);
  const [picUser, setPicUser] = useState(null);
  const { setImageId, setComments, headers, setImage } =
    useContext(StateContext);

  useEffect(() => {
    const getImage = async () => {
      console.log('Start fetching data');
      const res = await fetch(`http://localhost:9000/api/v1/pics/${id}`, {
        method: 'GET',
        headers: headers,
      }).catch((error) => console.log(error));

      const imageJson = await res.json();

      const resUser = await fetch(
        `http://localhost:9000/api/v1/users/${imageJson.data.user}`,
        {
          method: 'GET',
          headers: headers,
        }
      ).catch((error) => console.log(error));

      const userJson = await resUser.json();

      setImageInfo(imageJson.data);
      setImage(imageJson.data.image);
      setPicUser(userJson.user);
      setImageId(id);
      setComments(imageJson.data.comments);

      console.log('End fetching data');
    };

    if (!picUser || !imageInfo) getImage();
  }, [id, picUser, imageInfo]);

  return (
    <>
      <Image id={id} picUser={picUser} imageInfo={imageInfo} />
    </>
  );
};

export default ImagePage;
