import { Component } from 'react';
import './styles.css';
import Container from '../../components/Container';
import Posts from '../../components/Posts';
import { loadPosts } from '../../utils/loadPosts.js';
import Button from '../../components/Button';

class Home extends Component {
  state = {
    page: 0,
    postsPerPage: 3,
    allPosts: [],
    posts: [],
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  loadPostsInTheHome = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  componentDidMount() {
    this.loadPostsInTheHome();
  }

  render() {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <Container>
        <Posts posts={posts} />
        <Button disabled={noMorePosts} onClick={this.loadMorePosts} text="Load More Posts" />
      </Container>
    );
  }
}

export default Home;
