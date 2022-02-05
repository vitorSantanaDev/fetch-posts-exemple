import { render, screen } from '@testing-library/react';
import Posts from '.';
import { postsProps } from './mock';

describe('<Posts />', () => {
  it('should render Posts', () => {
    render(<Posts posts={postsProps} />);
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
  });

  it('should not render Posts', () => {
    render(<Posts posts={[]} />);
    expect(screen.queryAllByRole('heading', { name: /title/i }));
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts posts={postsProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
