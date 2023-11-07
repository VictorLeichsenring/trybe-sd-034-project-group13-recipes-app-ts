import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeProvider from '../context/RecipeProvider';

describe('Teste renderização', () => {
  const IDTopBTN = 'search-top-btn';
  const IDSearchInput = 'search-input';
  const IDSearchBtn = 'exec-search-btn';

  test('testa renderização login ir para meals', async () => {
    render(
      <RecipeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecipeProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPass = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    await userEvent.type(inputEmail, 'teste@teste.com');
    await userEvent.type(inputPass, '1234567');
    await userEvent.click(loginBtn);
    const searchTopBtn = screen.getByTestId(IDTopBTN);
    await userEvent.click(searchTopBtn);
    const radioName = screen.getByTestId('name-search-radio');
    await userEvent.click(radioName);
    const inputQuery = screen.getByTestId(IDSearchInput);
    const searchBtn = screen.getByTestId(IDSearchBtn);
    await userEvent.type(inputQuery, 'rice');
    await userEvent.click(searchBtn);
    // expect(screen.getByTestId('page-title')).toBeInTheDocument();
    // expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  test('Teste no meals', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
      { route: '/meals' },
    );
    const searchTopBtn = screen.getByTestId(IDTopBTN);
    await userEvent.click(searchTopBtn);
    const inputQuery = screen.getByTestId(IDSearchInput);
    const searchBtn = screen.getByTestId(IDSearchBtn);
    await userEvent.type(inputQuery, 'chicken');
    await userEvent.click(searchBtn);
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  test('Teste no drinks', async () => {
    renderWithRouter(
      <RecipeProvider>
        <App />
      </RecipeProvider>,
      { route: '/drinks' },
    );
    const searchTopBtn = screen.getByTestId(IDTopBTN);
    await userEvent.click(searchTopBtn);
    const inputQuery = screen.getByTestId(IDSearchInput);
    const searchBtn = screen.getByTestId(IDSearchBtn);
    await userEvent.type(inputQuery, 'water');
    await userEvent.click(searchBtn);
  });
});
