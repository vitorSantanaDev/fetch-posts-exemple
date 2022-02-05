import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';

describe('<Button/>', () => {
  it('should render the Button with the text "Load More Posts"', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={false} text="Load More Posts" />);
    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on click Button', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={false} text="Load More Posts" />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={true} text="Load More Posts" />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={false} text="Load More Posts" />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeEnabled();
  });
});
