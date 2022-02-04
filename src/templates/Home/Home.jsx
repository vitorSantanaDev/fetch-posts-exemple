import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { loadPosts } from '../../utils/loadPosts.js';
import Container from '../../components/Container';
import Posts from '../../components/Posts';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Home = () => {
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const loadPostsInTheHome = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const handleChangeInputField = ({ target }) => {
    setSearchValue(target.value);
  };

  useEffect(() => {
    loadPostsInTheHome(0, postsPerPage);
  }, [loadPostsInTheHome, postsPerPage]);

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <Container>
      <div className="searchContainer">
        {!!searchValue && <h1>Search: {searchValue}</h1>}
        <Input value={searchValue} onChange={handleChangeInputField} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <h1>Post não encontrado! :(</h1>}
      {!searchValue && <Button disabled={noMorePosts} onClick={loadMorePosts} text="Load More Posts" />}
    </Container>
  );
};

export default Home;
