import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetails from '../page/RecipeDetails';

test('renders loading message if recipeDetails is not available', () => {
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );

  const loadingMessage = screen.getByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();
});

test('Renderiza o componente RecipeDetails', () => {
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
});
