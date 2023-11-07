import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeInProgress from '../page/RecipeInProgress';
import fetchData from '../services/fetchData';

// Mock do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // importa todas as funções e componentes reais
  return {
    ...actual, // retorna todos os componentes e funções reais
    useParams: vi.fn().mockReturnValue({ id: '52977' }), // mock do useParams
  };
});

vi.mock('../services/fetchData', () => ({
  __esModule: true,
  default: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('RecipeInProgress', () => {
  test('fetch data', async () => {
    const MOCK_DATA = {
      meals: [{
        idMeal: '52977',
        strCategory: 'Side',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        strMeal: 'Corba',
        strArea: 'Turkish',
        strIngredient1: 'Lentils',
        strIngredient2: 'Onion',
        strMeasure1: '1 cup ',
        strMeasure2: '1 large',
        strInstructions: 'Passo a Passo detalhado',
        strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
        strTags: 'Soup',
      }],
    };
    vi.mocked(fetchData).mockResolvedValue(MOCK_DATA);
    const { user } = renderWithRouter(<RecipeInProgress />, { route: '/meals/52977/in-progress' });
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    await user.click(btnShare);

    const messageLink = await screen.findByText('Link copied!');
    expect(messageLink).toBeInTheDocument();

    const btnfavorite = await screen.findByTestId('favorite-btn');
    expect(btnfavorite).toHaveAttribute('src', expect.stringContaining('whiteHeartIcon.svg'));
    await user.click(btnfavorite);

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const title = await screen.findByRole('heading', { name: 'Corba' });
    expect(title).toBeInTheDocument();

    const recipecategory = await screen.findByTestId('recipe-category');
    expect(recipecategory).toBeInTheDocument();

    const instructionsText = await screen.findByTestId('instructions');
    expect(instructionsText).toBeInTheDocument();

    // Encontra os elementos LI que contêm os checkboxes pelo data-testid
    const firstIngredientItem = await screen.findByTestId('0-ingredient-step');
    const secondIngredientItem = await screen.findByTestId('1-ingredient-step');

    // Encontra os inputs de checkbox dentro dos elementos LI
    const firstIngredientCheckbox = firstIngredientItem.querySelector('input[type="checkbox"]');
    const secondIngredientCheckbox = secondIngredientItem.querySelector('input[type="checkbox"]');

    // Verifique se os checkboxes estão inicialmente desmarcados
    expect(firstIngredientCheckbox).not.toBeChecked();
    expect(secondIngredientCheckbox).not.toBeChecked();

    // Simule cliques nos checkboxes dos ingredientes
    if (firstIngredientCheckbox && secondIngredientCheckbox) {
      await user.click(firstIngredientCheckbox);
      await user.click(secondIngredientCheckbox);
    }

    // Verifique se os checkboxes estão marcados após os cliques
    expect(firstIngredientCheckbox).toBeChecked();
    expect(secondIngredientCheckbox).toBeChecked();

    // Verifique se o botão de finalizar está habilitado após todos os checkboxes estarem marcados
    const buttonFinish = await screen.findByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeEnabled();
  });
});
