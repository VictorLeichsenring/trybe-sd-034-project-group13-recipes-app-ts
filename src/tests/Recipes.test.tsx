import Recipes from '../components/Recipes';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Recipes Component', () => {
  test('if the component is rendering correctly', async () => {
    const { getByTestId } = renderWithRouter(<Recipes
      image="testImage"
      name="testName"
      index={ 0 }
      id="testId"
      type="meal"
    />);
    const recipeCard = getByTestId('0-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const image = getByTestId('0-card-img');
    expect(image).toHaveAttribute('src', 'testImage');
    const name = getByTestId('0-card-name');
    expect(name).toHaveTextContent('testName');
    const link = getByTestId('0-recipe-link');
    expect(link).toHaveAttribute('href', '/meals/testId');
  });
  test('renders a drink recipe correctly', async () => {
    const { getByTestId } = renderWithRouter(<Recipes
      image="testImage"
      name="testName"
      index={ 1 }
      id="testId"
      type="drink"
    />);
    const recipeCard = getByTestId('1-recipe-card');
    expect(recipeCard).toBeInTheDocument();
    const image = getByTestId('1-card-img');
    expect(image).toHaveAttribute('src', 'testImage');
    const name = getByTestId('1-card-name');
    expect(name).toHaveTextContent('testName');
    const link = getByTestId('1-recipe-link');
    expect(link).toHaveAttribute('href', '/drinks/testId');
  });
});
