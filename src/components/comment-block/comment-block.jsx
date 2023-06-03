import React, { useContext } from 'react';
import './comment-block.css';
import StateContext from '../../context';
import CommentForm from '../comment-form/comment-form.jsx';

const CommentBlock = () => {
  const timeSince = function (date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval}y ago `;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval}mo ago `;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval}d ago `;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval}h ago `;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval}m ago `;
    }
    return `${Math.floor(seconds)}s ago `;
  };

  const globalState = useContext(StateContext);
  return (
    <>
      <CommentForm globalState={globalState} />
      <div className='comment-section'>
        <span className='comment-span'>Comments: </span>

        <div className='comment-container'>
          {globalState.comments?.map((comment, index) => (
            <div className='comment' user={comment.user} key={index}>
              <span className='comment-date'>
                {timeSince(new Date(comment?.timeCreated))}
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
