import React from 'react';
import './styles.css';
import Types from 'prop-types';

const PostCard = ({ cover, title, body }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="postContent">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  cover: Types.string.isRequired,
  title: Types.string.isRequired,
  body: Types.string.isRequired,
};

export default PostCard;
