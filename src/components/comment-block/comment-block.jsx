import React, { useContext } from 'react';
import './comment-block.css';
import StateContext from '../../context';
import CommentForm from '../comment-form/comment-form.jsx';

const CommentBlock = () => {
  const timeSince = function (date) {
    console.log(date);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval}y `;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval}m `;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval}d `;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval}h `;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval}m `;
    }
    return `${Math.floor(seconds)}s `;
  };

  const globalState = useContext(StateContext);
  console.log(`The comments from comment block are ${globalState.comments}`);
  console.log(
    `The user from the comment block is ${globalState.currentUser.username}`
  );
  return (
    //Comment.user will be the user object from the DB, since protected gives access to req.user, I'll include that as part of the
    //comment object

    // Must pass in context state as prop, cant call useContext inside child component or it messes up

    <>
      <CommentForm globalState={globalState} />
      <div className='comment-section'>
        <span className='comment-span'>Comments: </span>

        <div className='comment-container'>
          {globalState.comments?.map((comment, index) => (
            <div className='comment' user={comment.user} key={index}>
              <span className='comment-date'>
                {timeSince(comment?.timeCreated)}
              </span>
              <span className='comment-username'>{comment.user} posted: </span>
              <span className='comment-text'>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentBlock;
