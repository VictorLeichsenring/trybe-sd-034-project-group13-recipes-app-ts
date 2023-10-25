import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../components/Login';

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
