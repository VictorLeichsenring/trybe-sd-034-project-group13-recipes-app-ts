import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../helpers/renderWithRouter';
import '@testing-library/jest-dom/extend-expect';

describe('Test SearchBar Componet', () => {
  test('testa o componente search-bar na rota meals', async () => {
    const { getByTestId } = renderWithRouter(<SearchBar />, { route: '/meals' });
    const user = userEvent;

    const searchInput = getByTestId('search-input');
    await user.type(searchInput, 'teste');
    expect(searchInput).toBeInTheDocument();

    const radioIngredient = getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioFirstLetter = getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();

    const btnSearchBar = getByTestId('exec-search-btn');
    await user.click(btnSearchBar);
    expect(btnSearchBar).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'rice' } });

    

    // const endpoint = getByDisplayValue('https://www.themealdb.com/api/json/v1/1/search.php?s=teste');

    // const btnIngredient = getByRole('radio', { name: /ingredient/i });
    // await user.click(btnIngredient);
    // expect(btnIngredient).toBeInTheDocument();

    // const btnName = getByRole('radio', { name: /name/i });
    // await user.click(btnName);
    // expect(btnName).toBeInTheDocument();

  // const filterButton = getByRole('button', { name: 'Buscar' });
  // await user.click(filterButton);
  // expect(filterButton).toBeInTheDocument();
  });

  test('testa o componente search-bar na rota drinks', async () => {
    const { getByRole, getByTestId } = renderWithRouter(<SearchBar />, { route: '/drinks' });
    const user = userEvent;

    const btnIngredient = getByRole('radio', { name: /ingredient/i });
    await user.click(btnIngredient);
    expect(btnIngredient).toBeInTheDocument();

    const btnName = getByRole('radio', { name: /name/i });
    await user.click(btnName);
    expect(btnName).toBeInTheDocument();

    const btnFirstLetter = getByRole('radio', { name: /first letter/i });
    await user.click(btnFirstLetter);
    expect(btnFirstLetter).toBeInTheDocument();

    const searchInput = getByTestId('search-input');
    await user.type(searchInput, 'teste');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'water' } });

    // const radioIngredient = getByTestId('ingredient-search-radio');
    // expect(radioIngredient).toBeInTheDocument();
    // await user.deselectOptions(radioIngredient, 'ingredient');

    // const radioName = getByTestId('name-search-radio');
    // expect(radioName).toBeInTheDocument();

    // const radioFirstLetter = getByTestId('first-letter-search-radio');
    // expect(radioFirstLetter).toBeInTheDocument();

    const btnSearchBar = getByTestId('exec-search-btn');
    await user.click(btnSearchBar);
    expect(btnSearchBar).toBeInTheDocument();

    const filterButton = getByRole('button', { name: 'Buscar' });
    await user.click(filterButton);
    expect(filterButton).toBeInTheDocument();
  });
});
