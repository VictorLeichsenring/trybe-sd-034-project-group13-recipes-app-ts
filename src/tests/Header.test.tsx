import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Header Component', () => {
  test('Test the header component in the /meals route', async () => {
    const { getByTestId, getByRole, getByPlaceholderText } = renderWithRouter(<Header />, { route: '/meals' });
    const user = userEvent;

    const imgProfile = getByTestId('profile-top-btn');
    expect(imgProfile).toBeInTheDocument();

    const btnSearch = getByTestId('search-top-btn');
    expect(btnSearch).toBeInTheDocument();

    const routeMeals = getByRole('heading', { name: /meals/i });
    expect(routeMeals).toBeInTheDocument();

    await user.click(btnSearch);

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    await user.click(btnSearch);
    expect(searchInput).not.toBeInTheDocument();

    const titleHeader = getByTestId('page-title');
    expect(titleHeader).toBeInTheDocument();

    const placeHolderTest = getByPlaceholderText('Search Recipe');
    expect(placeHolderTest).toBeInTheDocument();
  });

  test('Test the header component in the /drinks route', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/drinks' });
    const routeDrinks = getByRole('heading', { name: /drinks/i });
    expect(routeDrinks).toBeInTheDocument();
  });

  test('Test the header component in the /profile route', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/profile' });
    const routeProfile = getByRole('heading', { name: /profile/i });
    expect(routeProfile).toBeInTheDocument();
  });

  test('Test the header component in the /done-recipes route', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/done-recipes' });
    const routeDoneRecipes = getByRole('heading', { name: /done recipes/i });
    expect(routeDoneRecipes).toBeInTheDocument();
  });

  test('Test the header component in the /favorite-recipes route', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '/favorite-recipes' });
    const routeFavoriteRecipes = getByRole('heading', { name: /favorite recipes/i });
    expect(routeFavoriteRecipes).toBeInTheDocument();
  });

  test('Test the header component in the /* route', async () => {
    const { getByRole } = renderWithRouter(<Header />, { route: '*' });
    const routeNotFound = getByRole('heading', { name: /not default/i });
    expect(routeNotFound).toBeInTheDocument();
  });
});
