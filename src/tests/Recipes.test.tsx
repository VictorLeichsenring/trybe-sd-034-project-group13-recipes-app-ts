import Recipes from '../components/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Recipes Component', () => {
  test('if the component is rendering correctly', async () => {
    const { getByTestId } = renderWithRouter(<Recipes image="" name="" index={ 0 } />);
    const recipeCard = getByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
  });
});
