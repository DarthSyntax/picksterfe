import { React, useState, useContext } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import StateContext from '../../context';
import './upload-modal.css';

const UploadModal = () => {
  const { currentUser, headers } = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [caption, setCaption] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    console.log('Modal Opened!');
  };

  const handleClose = () => {
    setOpen(false);
    console.log('Modal Closed!');
  };

  const handleSubmit = async function (event) {
    event.preventDefault();

    fetch('http://localhost:9000/api/v1/pics', {
      method: 'POST',
      body: JSON.stringify({
        image: imageURL,
        caption: caption,
        //user: currentUser.username,
      }),
      headers: headers,
    }).then(() => {
      setOpen(false);
    });
  };

  return (
    <div>
      <Button
        className='upload-button'
        onClick={handleOpen}
        variant='contained'
      >
        Upload
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 500,
            height: 200,
            bgcolor: 'background.paper',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6'>Upload an image link</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className='textfield'
              id='imageUrl'
              label='Image URL'
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
            />

            <TextField
              className='textfield'
              id='caption'
              label='Caption (optional)'
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            <Button type='submit'>Confirm</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadModal;
