import { vi } from 'vitest';
import { waitForElementToBeRemoved } from '@testing-library/react';
import RecipeDetails from '../page/RecipeDetails';
import { mocksRecipes } from '../services/MockData';
import renderWithRouter from '../helpers/renderWithRouter';

describe('RecipeDetails Component', () => {
  beforeEach(() => {
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mocksRecipes),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders loading text when data is not available', () => {
    const { getByText } = renderWithRouter(<RecipeDetails />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders recipe details correctly', async () => {
    const { getByTestId, getByText } = renderWithRouter(<RecipeDetails />);
    const loading = getByText('Loading...');
    await waitForElementToBeRemoved(loading);

    expect(getByTestId('recipe-photo')).toHaveAttribute('src', mocksRecipes.strMealThumb);
    expect(getByTestId('recipe-title')).toHaveTextContent(mocksRecipes.strMeal);
    expect(getByTestId('recipe-category')).toHaveTextContent(mocksRecipes.strCategory);
    expect(getByTestId('instructions')).toHaveTextContent(mocksRecipes.strInstructions);
    expect(getByTestId('video')).toHaveAttribute('src', mocksRecipes.strYoutube);
  });
});
