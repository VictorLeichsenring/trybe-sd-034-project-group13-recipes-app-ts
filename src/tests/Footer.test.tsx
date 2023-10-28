import Footer from '../components/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Footer Componet', () => {
  test('test whether the Footer renders', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
