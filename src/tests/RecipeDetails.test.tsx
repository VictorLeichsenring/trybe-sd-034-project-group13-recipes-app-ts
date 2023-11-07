import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import RecipeDetails from '../page/RecipeDetails';
import fetchData from '../services/fetchData';

vi.mock('../services/fetchData', () => ({
  __esModule: true,
  default: vi.fn(),
}));
describe('Recipe Details', () => {
  beforeEach(() => {
    // Limpar o localStorage antes de cada teste
    localStorage.clear();
    // Inicializar o localStorage com o estado necessário para o teste
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // Configurar o mock do fetchData aqui se necessário
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('fetch data para meals', async () => {
    const MOCKDATA = {
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
      }],
    };
    vi.mocked(fetchData).mockResolvedValue(MOCKDATA);

    const { user } = renderWithRouter(<RecipeDetails />, { route: '/meals/52977' });
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    await user.click(btnShare);

    const messageLink = await screen.findByText('Link copied!');
    expect(messageLink).toBeInTheDocument();

    // const btnfavorite = await screen.findByTestId('favorite-btn');
    // expect(btnfavorite).toHaveAttribute('src', expect.stringContaining('whiteHeartIcon.svg'));
    // await user.click(btnfavorite);
    // await waitFor(() => {
    //   // Você pode precisar reconsultar o botão de favoritos se o componente for completamente re-renderizado após o clique
    //   const updatedBtnFavorite = screen.getByTestId('favorite-btn');
    //   expect(updatedBtnFavorite).toHaveAttribute('src', expect.stringContaining('blackHeartIcon.svg'));
    // });
    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const title = await screen.findByRole('heading', { name: 'Corba' });
    expect(title).toBeInTheDocument();

    const recipecategory = await screen.findByTestId('recipe-category');
    expect(recipecategory).toBeInTheDocument();

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(firstIngredient).toBeInTheDocument();

    const instructionsText = await screen.findByTestId('instructions');
    expect(instructionsText).toBeInTheDocument();

    const buttonStart = await screen.findByTestId('start-recipe-btn');
    await user.click(buttonStart);
  });
  it('fetch data para drinks', async () => {
    vi.clearAllMocks();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom'); // importa todas as funções e componentes reais
      return {
        ...actual, // retorna todos os componentes e funções reais
        useParams: vi.fn().mockReturnValue({ id: '17837' }), // mock do useParams
      };
    });
    const MOCKDATA = {
      drinks: [{
        idDrink: '17837',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
        strDrink: 'Adam',
        strCategory: 'Ordinary Drink',
        strAlcoholic: 'Alcoholic',
        strInstructions: 'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
        strVideo: null,
        strIngredient1: 'Dark rum',
        strIngredient2: 'Lemon juice',
        strIngredient3: 'Grenadine',
        strMeasure1: '2 oz ',
        strMeasure2: '1 oz ',
        strMeasure3: '1 tsp ',
      }],
    };
    vi.mocked(fetchData).mockResolvedValue(MOCKDATA);

    const { user } = renderWithRouter(<RecipeDetails />, { route: '/drinks/:id' });

    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    await user.click(btnShare);

    const messageLink = await screen.findByText('Link copied!');
    expect(messageLink).toBeInTheDocument();

    const btnFavorite = await screen.findByTestId('favorite-btn');
    expect(btnFavorite).toHaveAttribute('src', expect.stringContaining('whiteHeartIcon.svg'));
    await user.click(btnFavorite);
    expect(btnFavorite).not.toHaveAttribute('src', expect.stringContaining('whiteHeartIcon.svg'));

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeInTheDocument();

    const title = await screen.findByRole('heading', { name: 'Adam' });
    expect(title).toBeInTheDocument();

    const recipecategory = await screen.findByTestId('recipe-category');
    expect(recipecategory).toBeInTheDocument();

    const firstIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(firstIngredient).toBeInTheDocument();

    const instructionsText = await screen.findByTestId('instructions');
    expect(instructionsText).toBeInTheDocument();

    const buttonStart = await screen.findByTestId('start-recipe-btn');
    await user.click(buttonStart);
    // const finishbtn = await screen.findByTestId('finish-recipe-btn');
  });
//   test('Teste do botão Favorite', async () => {
//     vi.clearAllMocks();
//     vi.mock('react-router-dom', async () => {
//       const actual = await vi.importActual('react-router-dom'); // importa todas as funções e componentes reais
//       return {
//         ...actual, // retorna todos os componentes e funções reais
//         useParams: vi.fn().mockReturnValue({ id: '52977' }), // mock do useParams
//       };
//     });
//     const MOCKDATA = {
//       drinks: [{
//         idDrink: '17837',
//         strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg',
//         strDrink: 'Adam',
//         strCategory: 'Ordinary Drink',
//         strAlcoholic: 'Alcoholic',
//         strInstructions: 'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
//         strVideo: null,
//         strIngredient1: 'Dark rum',
//         strIngredient2: 'Lemon juice',
//         strIngredient3: 'Grenadine',
//         strMeasure1: '2 oz ',
//         strMeasure2: '1 oz ',
//         strMeasure3: '1 tsp ',
//       }],
//     };
//     vi.mocked(fetchData).mockResolvedValue(MOCKDATA);
//     const { user } = renderWithRouter(<RecipeDetails />, { route: '/drinks/17837' });
//     const btnFavorite = await screen.findByTestId('favorite-btn');
//     expect(btnFavorite).toHaveAttribute('src', expect.stringContaining('whiteHeartIcon.svg'));
//     await user.click(btnFavorite);
//     expect(btnFavorite).toHaveAttribute('src', expect.stringContaining('blackHeartIcon.svg'));
//   });
});
