import { render, screen } from '@testing-library/react';
import PostCard from '.';
import { postCardProps } from './mock';

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...postCardProps} />);

    expect(screen.getByAltText(postCardProps.title)).toHaveAttribute('src', postCardProps.cover);
    expect(screen.getByRole('heading', { name: postCardProps.title })).toBeInTheDocument();
    expect(screen.getByText(postCardProps.body)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...postCardProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
