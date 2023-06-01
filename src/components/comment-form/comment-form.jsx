import { Button } from '@mui/material';
import React, { useState } from 'react';
import './comment-form.css';

const CommentForm = ({ globalState }) => {
  const [commentText, setCommentText] = useState('');

  const handleChange = function (e) {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    if (!commentText)
      return console.log(
        'Cannot submit a comment with no text!',
        e.target.value
      );

    const newCommentJson = {
      comment: {
        user: globalState.currentUser.username,
        text: commentText,
        timeCreated: new Date(),
      },
    };
    console.log(
      `Comment before PATCH request is ${newCommentJson.comment.text}`
    );

    //code to add comment to database here
    try {
      const res = await fetch(
        `http://localhost:9000/api/v1/pics/${globalState.imageId}`,
        {
          method: 'PATCH',
          headers: globalState.headers,
          body: JSON.stringify(newCommentJson),
        }
      );

      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    globalState.setComments([newCommentJson.comment, ...globalState.comments]);

    setCommentText('');
  };

  return (
    <form className='comment-form' id='comment-form' onSubmit={handleSubmit}>
      <label className='comment-label'>Leave a comment</label>
      <textarea
        className='comment-box'
        onChange={handleChange}
        value={commentText}
      />

      <Button
        type='submit'
        className='comment-submmit'
        size='small'
        variant='contained'
      >
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
