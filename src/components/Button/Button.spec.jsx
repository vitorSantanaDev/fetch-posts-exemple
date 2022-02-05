import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';
import { buttonProps } from './mock';

describe('<Button/>', () => {
  it('should render the Button with the text "Load More Posts"', () => {
    render(<Button {...buttonProps} />);
    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on click Button', () => {
    render(<Button {...buttonProps} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(buttonProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled={!buttonProps.disabled} text={buttonProps.text} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    render(<Button onClick={buttonProps.onClick} disabled={buttonProps.disabled} text={buttonProps.text} />);
    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const { container } = render(<Button {...buttonProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
