import React from 'react';
import './styles.css';
import PostCard from '../PostCard';
import Types from 'prop-types';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard key={post.id} cover={post.cover} title={post.title} body={post.body} />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: Types.array.isRequired,
};

export default Posts;
