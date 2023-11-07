import { vi } from 'vitest';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import {
  getFromLocalStorage,
  setToLocalStorage,
  isRecipeInStorage,
  toggleFavoriteRecipe,
  saveRecipeProgress,
  getRecipeProgress,
} from '../services/localStorageUtils';

beforeEach(() => {
  localStorage.clear();
  renderWithRouter(<App />);
});

const emailTeste = 'teste@teste.com';
test('Teste da getFromLocalStorage', () => {
  localStorage.setItem('user', JSON.stringify({ email: emailTeste }));
  const data = getFromLocalStorage('user');
  expect(data).toEqual({ email: emailTeste });
});
test('Teste da setToLocalStorage', () => {
  setToLocalStorage('user', emailTeste);
  const stored = localStorage.getItem('user');
  if (stored) {
    const data = JSON.parse(stored);
    expect(data).toEqual(emailTeste);
  }
});
test('Teste da isRecipeInStorage', () => {
  const mockStorageInProgress = {
    drinks: {
      17222: [0, 1, 2, 3],
    },
    meals: {
      52977: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      53060: [2, 3, 4, 1, 0, 5],
    },
  };

  setToLocalStorage('inProgressRecipes', mockStorageInProgress);
  expect(isRecipeInStorage('inProgressRecipes', '17222', false)).toBeTruthy();
});
test('Testa o erro em getFromLocalStorage', () => {
  localStorage.setItem('badData', 'not a valid json');
  const errorSpy = vi.spyOn(console, 'error');
  const result = getFromLocalStorage('badData');
  expect(result).toBeNull();
  expect(errorSpy).toHaveBeenCalledWith(
    'Failed to get badData from localStorage:',
    expect.any(Error),
  );
  errorSpy.mockRestore();
});
test('Testa o erro em setToLocalStorage', () => {
  const setItemError = new Error('Storage is full');
  const setItemMock = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw setItemError;
  });
  const errorSpy = vi.spyOn(console, 'error');
  setToLocalStorage('user', { email: 'test@test.com' });
  expect(errorSpy).toHaveBeenCalledWith(
    'Failed to set user to localStorage:',
    setItemError,
  );
  setItemMock.mockRestore();
  errorSpy.mockRestore();
});
test('Teste da toggleFavoriteRecipe quando não está no LocalStorage', () => {
  const mockRecipe = {

    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',

  };
  expect(getFromLocalStorage('favoriteRecipes')).toBeNull();
  toggleFavoriteRecipe(mockRecipe, '52977', true);
  const favorites = getFromLocalStorage('favoriteRecipes');

  expect(favorites).toEqual([expect.objectContaining({ id: '52977' })]);
});
test('Teste da toggleFavoriteRecipe quando está no LocalStorage em meal', () => {
  const mockRecipe = {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    nationality: '',
    type: 'drink',
  };
  setToLocalStorage('favoriteRecipes', [mockRecipe]);
  let favorites = getFromLocalStorage('favoriteRecipes');
  expect(favorites).toEqual([expect.objectContaining({ id: '17222' })]);
  toggleFavoriteRecipe(mockRecipe, '17222', false);
  favorites = getFromLocalStorage('favoriteRecipes');
  expect(favorites).not.toContainEqual(expect.objectContaining({ id: '17222' }));
  localStorage.removeItem('favoriteRecipes');
});
test('Teste da toggleFavoriteRecipe quando está no LocalStorage em drink', () => {

});
test('Teste da saveRecipeProgress', () => {
  const mockStorageInProgress = {
    drinks: {
      17222: [0, 1, 2],
    },
    meals: {
      52977: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      53060: [2, 3, 4, 1, 0, 5],
    },
  };
  setToLocalStorage('inProgressRecipes', mockStorageInProgress);
  saveRecipeProgress('52977', true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const inProgress = getFromLocalStorage('inProgressRecipes');
  expect(inProgress).not.toEqual(mockStorageInProgress);
});

test('Teste da getRecipeProgress', () => {
  const mockStorageInProgress = {
    drinks: {
      17222: [0, 1, 2],
    },
    meals: {
      52977: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      53060: [2, 3, 4, 1, 0, 5],
    },
  };
  setToLocalStorage('inProgressRecipes', mockStorageInProgress);
  const storedRecipe = getRecipeProgress('52977', true);
  expect(storedRecipe).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
});
