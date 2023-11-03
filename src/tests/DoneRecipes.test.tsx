import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import DoneRecipes from '../page/DoneRecipes';

test('renderiza o componente DoneRecipes corretamente', () => {
  render(
    <MemoryRouter>
      <DoneRecipes />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Receitas Feitas/i)).toBeInTheDocument();
  expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
  expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
});

test('interage com os botões de filtro', () => {
  render(
    <MemoryRouter>
      <DoneRecipes />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByTestId('filter-by-all-btn'));
  // Verifique se a ação de filtragem ocorre corretamente

  fireEvent.click(screen.getByTestId('filter-by-meal-btn'));
  // Verifique se a ação de filtragem ocorre corretamente

  fireEvent.click(screen.getByTestId('filter-by-drink-btn'));
  // Verifique se a ação de filtragem ocorre corretamente
});
