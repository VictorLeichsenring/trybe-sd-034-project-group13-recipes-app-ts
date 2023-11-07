import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import CategoryFilterBottons from '../components/CategoryFilterBottons';
import { mockmealCategories, mockdrinkCategories } from './data';
import RecipeContext from '../context/RecipeContext';

describe('Teste Category Filter Bottons', () => {
  test('Testa qunado é meals', async () => {
    const fetchResolvedValue = {
      json: async () => mockmealCategories,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<CategoryFilterBottons />, { route: '/meals' });
    const beefButton = await screen.findByTestId('Beef-category-filter');
    const breakfastButton = await screen.findByTestId('Breakfast-category-filter');
    const chickenButton = await screen.findByTestId('Chicken-category-filter');
    const DessertButton = await screen.findByTestId('Dessert-category-filter');
    const GoatButton = await screen.findByTestId('Goat-category-filter');
    const AllButton = await screen.findByTestId('All-category-filter');
    expect(mockFetch).toHaveBeenCalled();
    expect(beefButton).toBeInTheDocument();
    expect(breakfastButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(DessertButton).toBeInTheDocument();
    expect(GoatButton).toBeInTheDocument();
    expect(AllButton).toBeInTheDocument();
  });
  test('Testa qunado é drinks', async () => {
    const fetchResolvedValue = {
      json: async () => mockdrinkCategories,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);
    renderWithRouter(<CategoryFilterBottons />, { route: '/drinks' });
    const ordinaryButton = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    const shakeButton = await screen.findByTestId('Shake-category-filter');
    const otherButton = await screen.findByTestId('Other/Unknown-category-filter');
    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');
    const AllButton = await screen.findByTestId('All-category-filter');
    expect(mockFetch).toHaveBeenCalled();
    expect(ordinaryButton).toBeInTheDocument();
    expect(cocktailButton).toBeInTheDocument();
    expect(shakeButton).toBeInTheDocument();
    expect(otherButton).toBeInTheDocument();
    expect(cocoaButton).toBeInTheDocument();
    expect(AllButton).toBeInTheDocument();
  });
  test('Testa quando ocorre um erro', async () => {
    const mockFetch = vi.spyOn(global, 'fetch')
      .mockRejectedValue(new Error('Network error'));
    renderWithRouter(<CategoryFilterBottons />, { route: '/drinks' });
    expect(mockFetch).toHaveBeenCalled();
  });
  test('Testa quando ocorre um botão é clicado em meals', async () => {
    const setRecipesMock = vi.fn();

    const contextValue = {
      providerValue: {
        recipes: [],
        setRecipes: setRecipesMock,
      },
    };

    const fetchResolvedValue = {
      json: async () => mockmealCategories,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    renderWithRouter(
      <RecipeContext.Provider value={ contextValue }>
        <CategoryFilterBottons />
      </RecipeContext.Provider>,
      { route: '/meals' },
    );
    const beefButton = await screen.findByTestId('Beef-category-filter');
    await userEvent.click(beefButton);
    expect(setRecipesMock).toHaveBeenCalled();
    mockFetch.mockRestore();
  });
  test('Testa quando ocorre um botão é clicado em drinks', async () => {
    const setRecipesMock = vi.fn();

    const contextValue = {
      providerValue: {
        recipes: [],
        setRecipes: setRecipesMock,
      },
    };

    const fetchResolvedValue = {
      json: async () => mockdrinkCategories,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    renderWithRouter(
      <RecipeContext.Provider value={ contextValue }>
        <CategoryFilterBottons />
      </RecipeContext.Provider>,
      { route: '/drinks' },
    );
    const ordinaryButton = await screen.findByTestId('Ordinary Drink-category-filter');
    await userEvent.click(ordinaryButton);
    expect(setRecipesMock).toHaveBeenCalled();
    mockFetch.mockRestore();
  });
  // const mockResponse = (status: any, statusText: any, response: any) => {
  //   return new Response(JSON.stringify(response), {
  //     status,
  //     statusText,
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  // };
  // test('Testa quando ocorre um erro', async () => {
  //   const setRecipesMock = vi.fn();
  //   const contextValue = {
  //     providerValue: {
  //       recipes: [],
  //       setRecipes: setRecipesMock,
  //     },
  //   };

  //   const consoleSpy = vi.spyOn(console, 'log');
  //   const fetchMock = vi.spyOn(global, 'fetch').mockImplementation(() => {
  //     return Promise.reject(new Error('Network Error'));
  //   });

  //   renderWithRouter(
  //     <RecipeContext.Provider value={ contextValue }>
  //       <CategoryFilterBottons />
  //     </RecipeContext.Provider>,
  //     { route: '/meals' },
  //   );

  //   // Aguarde uma atualização após a rejeição do fetch ter sido tratada.
  //   await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('Erro ao filtrar receitas'));

  //   expect(setRecipesMock).not.toHaveBeenCalled();

  //   fetchMock.mockRestore();
  //   consoleSpy.mockRestore();
  // });
  // test('setRecipes e setSelectedCategory são chamados com categorias de refeições', async () => {
  //   // Define os mocks para setRecipes e setSelectedCategory
  //   const setRecipesMock = vi.fn();
  //   const setSelectedCategoryMock = vi.fn();

  //   // Configura o valor do contexto para incluir os mocks
  //   const contextValue = {
  //     recipes: [],
  //     setRecipes: setRecipesMock,
  //     setSelectedCategory: setSelectedCategoryMock, // Adiciona isto se estiver no seu contexto
  //   // ... outros valores que possam ser necessários para seu contexto
  //   };

  //   // Renderiza o componente com o provedor de contexto
  //   renderWithRouter(
  //     <RecipeContext.Provider value={ contextValue }>
  //       <CategoryFilterBottons />
  //     </RecipeContext.Provider>,
  //     { route: '/meals' },
  //   );

  //   // Certifique-se de que o fetch mockado está sendo configurado para retornar os dados corretos
  //   vi.spyOn(global, 'fetch').mockResolvedValue({
  //     json: () => Promise.resolve(mockmealCategories),
  //   });

  //   // Aqui você precisa de uma maneira de acionar o fetch, como um clique em um botão de categoria
  //   const categoryButton = screen.getByText('Beef'); // Assumindo que há um botão 'Beef'
  //   userEvent.click(categoryButton);

  //   // Espere pela atualização do estado com os dados mockados
  //   await waitFor(() => {
  //     expect(setRecipesMock).toHaveBeenCalledWith(mockmealCategories.meals);
  //     // Verifique se setSelectedCategory foi chamado com a categoria correta
  //     expect(setSelectedCategoryMock).toHaveBeenCalledWith('Beef');
  //   });

  //   // Restaura o fetch mockado para evitar efeitos colaterais em outros testes
  //   vi.restoreAllMocks();
  // });
});
