import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../components/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

test('Tela de Login', async () => {
  const { getByTestId, getByRole } = renderWithRouter(<Login />);
  const user = userEvent;

  const titulo = getByRole('heading', { name: /login/i });
  expect(titulo).toBeInTheDocument();

  const email = getByTestId('email-input');
  expect(email).toBeInTheDocument();
  await user.type(email, 'alguem@email.com');

  const password = getByTestId('password-input');
  expect(password).toBeInTheDocument();
  await user.type(password, '1234567');

  const btn = getByTestId('login-submit-btn');
  await user.click(btn);
  waitFor(() => expect(btn).not.toBeDisabled());
});

describe('Header Component', () => {
  const inputSearch = 'search-input';
  test('tela de login Header', async () => {
    const { getByTestId, getByRole, getByPlaceholderText } = renderWithRouter(<Header />, { route: '/meals' });
    const user = userEvent;

    const imgProfile = getByTestId('profile-top-btn');
    expect(imgProfile).toBeInTheDocument();

    const btnSearch = getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    const routeMeals = getByRole('heading', { name: /meals/i });
    expect(routeMeals).toBeInTheDocument();

    await user.click(btnSearch);

    const searchInput = getByTestId(inputSearch);
    expect(searchInput).toBeInTheDocument();

    await user.click(btnSearch);
    expect(searchInput).not.toBeInTheDocument();

    const titleHeader = getByTestId('page-title');
    expect(titleHeader).toBeInTheDocument();

    const placeHolderTest = getByPlaceholderText('Search Recipe');
    expect(placeHolderTest).toBeInTheDocument();
  });

  test('testa rota drinks', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/drinks' });
    const routeDrinks = getByRole('heading', { name: /drinks/i });
    expect(routeDrinks).toBeInTheDocument();
  });

  test('testa rota profile', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/profile' });
    const routeProfile = getByRole('heading', { name: /profile/i });
    expect(routeProfile).toBeInTheDocument();
  });

  test('testa rota done-recipes', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/done-recipes' });
    const routeDoneRecipes = getByRole('heading', { name: /done recipes/i });
    expect(routeDoneRecipes).toBeInTheDocument();
  });

  test('testa rota favorite-recipes', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/favorite-recipes' });
    const routeFavoriteRecipes = getByRole('heading', { name: /favorite recipes/i });
    expect(routeFavoriteRecipes).toBeInTheDocument();
  });

  test('testa rota not-found', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '*' });
    const routeNotFound = getByRole('heading', { name: /not default/i });
    expect(routeNotFound).toBeInTheDocument();
  });

  test('testa se renderiza o Footer', async () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const footer = getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('testa o componente search-bar na rota meals', async () => {
    const { getByTestId, getByRole } = renderWithRouter(<SearchBar />, { route: '/meals' });
    const user = userEvent;

    const searchInput = getByTestId(inputSearch);
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

    const btnIngredient = getByRole('radio', { name: /ingredient/i });
    await user.click(btnIngredient);
    expect(btnIngredient).toBeInTheDocument();

    const btnName = getByRole('radio', { name: /name/i });
    await user.click(btnName);
    expect(btnName).toBeInTheDocument();

    const btnFirstLetter = getByRole('radio', { name: /first-letter/i });
    await user.click(btnFirstLetter);
    expect(btnFirstLetter).toBeInTheDocument();
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

    const radioIngredient = getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioFirstLetter = getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();

    const btnSearchBar = getByTestId('exec-search-btn');
    await user.click(btnSearchBar);
    expect(btnSearchBar).toBeInTheDocument();
  });
});
