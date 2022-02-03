export const loadPosts = async () => {
  const responsePosts = fetch('https://jsonplaceholder.typicode.com/posts');
  const responsePhotos = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([responsePosts, responsePhotos]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsAndPhotos = postsJson.map((post, index) => {
    return {
      ...post,
      cover: photosJson[index].url,
    };
  });

  return postsAndPhotos;
};
