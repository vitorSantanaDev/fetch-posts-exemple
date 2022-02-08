import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home';

const handlers = [
  rest.get('*jsonplaceholder.typicode*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userID: 1,
          id: 1,
          title: 'Title1 one!',
          body: 'Body post one, more reading posts.',
          url: 'img1.jpg',
        },
        {
          userID: 2,
          id: 2,
          title: 'Title2 two!',
          body: 'Body post two, more reading posts.',
          url: 'img2.jpg',
        },
        {
          userID: 3,
          id: 3,
          title: 'Title3 three!',
          body: 'Body post three, more reading posts.',
          url: 'img3.jpg',
        },
        {
          userID: 4,
          id: 4,
          title: 'Title4 for!',
          body: 'Body post for, more reading posts.',
          url: 'img4.jpg',
        },
        {
          userID: 5,
          id: 5,
          title: 'Title5 five!',
          body: 'Body post for, more reading posts.',
          url: 'img4.jpg',
        },
      ]),
    );
  }),
];
const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search Input, Posts and loadMorePosts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post não encontrado! :(');
    await waitForElementToBeRemoved(noMorePosts);

    expect.assertions(3);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(4);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post não encontrado! :(');
    await waitForElementToBeRemoved(noMorePosts);

    expect.assertions(13);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'Title1 one!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title2 two!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title3 three!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title4 for!' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Title5 five!' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'Title1 one!' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Title2 two!' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Title3 three!' })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Search: title1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'Title1 one!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title2 two!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Title3 three!' })).toBeInTheDocument();

    userEvent.type(search, 'post do not exist');
    expect(screen.getByText('Post não encontrado! :(')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Post não encontrado! :(');

    expect.assertions(2);
    await waitForElementToBeRemoved(noMorePosts);
    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);

    expect(screen.queryByRole('heading', { name: 'Title5 five!' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should match snapshopt', async () => {
    const { container } = render(<Home />);
    const noMorePosts = screen.getByText('Post não encontrado! :(');
    await waitForElementToBeRemoved(noMorePosts);

    expect(container.firstChild).toMatchSnapshot();
  });
});
