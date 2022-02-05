import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';

const mock = {
  text: 'Load More Posts',
  onClick: jest.fn(),
  disabled: false,
};

describe('<Button/>', () => {
  it('should render the Button with the text "Load More Posts"', () => {
    render(<Button {...mock} />);
    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on click Button', () => {
    render(<Button {...mock} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(mock.onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={!mock.disabled} text={mock.text} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    render(<Button onClick={mock.onClick} disabled={mock.disabled} text={mock.text} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeEnabled();
  });
});
