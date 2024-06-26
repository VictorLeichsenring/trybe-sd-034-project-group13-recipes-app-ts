import { screen } from '@testing-library/dom';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../helpers/renderWithRouter';
import '@testing-library/jest-dom/extend-expect';

// comentario test
describe('Test SearchBar Componet', () => {
  test('testa o componente search-bar na rota meals', async () => {
    const { user } = renderWithRouter(<SearchBar />, { route: '/meals' });

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    const radioName = screen.getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();
    await user.click(radioName);

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();
    await user.click(radioIngredient);

    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();

    const btnSearchBar = screen.getByTestId('exec-search-btn');
    expect(btnSearchBar).toBeInTheDocument();

    // Simula a digitação no campo de pesquisa
    await user.type(searchInput, 'teste');
    expect(searchInput).toHaveValue('teste');

    // Verifica se o placeholder do input está correto
    expect(searchInput).toHaveAttribute('placeholder', 'pesquisa');

    // Clica no rádio button de ingrediente
    await user.click(radioIngredient);
    expect(radioIngredient).toBeChecked();

    // Clica no rádio button da primeira letra
    await user.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    // Clica no rádio button de nome
    await user.click(radioName);
    expect(radioName).toBeChecked();
    await user.type(searchInput, 'askhjdkajshdkash');

    // Clica no botão de busca
    await user.click(btnSearchBar);
  });
  test('testa retorno > 12', async () => {
    const { user } = renderWithRouter(<SearchBar />, { route: '/meals' });
    const radioName = screen.getByTestId('name-search-radio');
    await user.click(radioName);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'a');
    const btnSearchBar = screen.getByTestId('exec-search-btn');
    await user.click(btnSearchBar);
  });
});
