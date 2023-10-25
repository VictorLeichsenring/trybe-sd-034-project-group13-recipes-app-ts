import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../components/Login';
import Header from '../components/Header';

test('Tela de Login', async () => {
  const { getByTestId } = renderWithRouter(<Login />);
  const user = userEvent;

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

test('tela de login Header', async () => {
  const { getByTestId, getByRole } = renderWithRouter(<Header />, { route: '/meals' });
  const user = userEvent;

  const imgProfile = getByTestId('profile-top-btn');
  expect(imgProfile).toBeInTheDocument();

  const btnSearch = getByTestId('search-top-btn');
  expect(btnSearch).toBeInTheDocument();

  const titulo = getByRole('heading', { name: /meals/i });
  expect(titulo).toBeInTheDocument();

  await user.click(btnSearch);

  const searchInput = getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();

  await user.click(btnSearch);
  expect(searchInput).not.toBeInTheDocument();
});
