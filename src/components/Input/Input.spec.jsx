import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '.';
import { propsInput } from './mock';

describe('<Input />', () => {
  it('should have value of value prop', () => {
    render(<Input onChange={propsInput.onChange} value={propsInput.value} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe('');
  });

  it('should call onChange function each key pressed', () => {
    const value = 'New value';
    render(<Input onChange={propsInput.onChange} value={value} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(propsInput.onChange).toHaveBeenCalledTimes(9);
  });

  it('should match snapshot', () => {
    const { container } = render(<Input onChange={propsInput.onChange} value={propsInput.value} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
