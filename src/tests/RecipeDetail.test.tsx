import RecipeDetails from '../page/RecipeDetails';
import renderWithRouter from '../helpers/renderWithRouter';

describe('RecipeDetails Component', () => {
  it('renders loading text when data is not available', () => {
    const { getByText } = renderWithRouter(<RecipeDetails />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  //   // it('renders recipe details correctly', async () => {
  //   //   vi.spyOn(global, 'fetch')
  //   //     .mockResolvedValueOnce({ json: async () => mocksRecipes } as Response);
  //   //   const { getByTestId, getByText } = renderWithRouter(<RecipeDetails />);

  //   //   await waitForElementToBeRemoved(() => getByText('Loading...'));

//   //   expect(getByTestId('recipe-photo')).toHaveAttribute('src', mocksRecipes.meals[0].strMealThumb);
//   //   expect(getByTestId('recipe-title')).toHaveTextContent(mocksRecipes.meals[0].strMeal);
//   //   expect(getByTestId('recipe-category')).toHaveTextContent(mocksRecipes.meals[0].strCategory);
//   //   expect(getByTestId('instructions')).toHaveTextContent(mocksRecipes.meals[0].strInstructions);
//   //   expect(getByTestId('video')).toHaveAttribute('src', mocksRecipes.meals[0].strYoutube);
//   // });
});
