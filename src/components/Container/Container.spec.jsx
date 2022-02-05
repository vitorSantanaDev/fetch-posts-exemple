import { render, screen } from '@testing-library/react';
import Container from '.';
import { propsContainer } from './mock';

describe('<Container />', () => {
  it('should render Container', () => {
    render(<Container>{propsContainer.children}</Container>);
    const h1 = screen.getByRole('heading', { name: /children/i });
    expect(h1).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Container>{propsContainer.children}</Container>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
