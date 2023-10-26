import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor, screen } from '@testing-library/react';
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
  test('tela de login Header', async () => {
    const { getByTestId, getByRole, getByPlaceholderText, getByText } = renderWithRouter(<Header />, { route: '/meals' });
    const user = userEvent;

    const imgProfile = getByTestId('profile-top-btn');
    expect(imgProfile).toBeInTheDocument();

    const btnSearch = getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    const routeMeals = getByRole('heading', { name: /meals/i });
    expect(routeMeals).toBeInTheDocument();

    await user.click(btnSearch);

    const searchInput = getByTestId('search-input');
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

  test('testa o componente search-bar', async () => {
    const { getByTestId, getByRole, getByPlaceholderText } = renderWithRouter(<SearchBar />, { route: '/meals' });
    const user = userEvent;

    // const btnSearch = getByTestId('search-top-btn');
    // expect(btnSearch).toBeInTheDocument();

    // await user.click(btnSearch);

    const searchInput = getByTestId('search-input');
    await user.type(searchInput, 'teste');
    expect(searchInput).toBeInTheDocument();

    // await user.click(btnSearch);
    // expect(searchInput).not.toBeInTheDocument();

    // const placeHolderTest = getByPlaceholderText('Search Recipe');
    // expect(placeHolderTest).toBeInTheDocument();

    const radioIngredient = getByTestId('ingredient-search-radio');
    expect(radioIngredient).toBeInTheDocument();

    const radioName = getByTestId('name-search-radio');
    expect(radioName).toBeInTheDocument();

    const radioFirstLetter = getByTestId('first-letter-search-radio');
    expect(radioFirstLetter).toBeInTheDocument();

    const btnSearchBar = getByTestId('exec-search-btn');
    expect(btnSearchBar).toBeInTheDocument();

    const btnIngredient = getByRole('radio', { name: /ingredient/i });
    expect(btnIngredient).toBeInTheDocument();

    const btnName = getByRole('radio', { name: /name/i });
    expect(btnName).toBeInTheDocument();

    // const btnFirstLetter = getByRole('radio', { name: /first-letter/i });
    // expect(btnFirstLetter).toBeInTheDocument();
  });
});
