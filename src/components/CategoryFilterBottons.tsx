import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function CategoryFilterBottons() {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const { providerValue } = useContext(RecipeContext);
  const { setRecipes } = providerValue;

  //   // função dentro do fetch para obter as categorias, esta usando async pois usa fetch
  useEffect(() => {
    //   // Função para obter as categorias
    async function fetchCategories() {
      try {
        let endpoint = '';

        //       // Verifica se é a página de refeições ou bebidas e define o endpoint correspondente
        if (location.pathname === '/meals') {
          endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        } else if (location.pathname === '/drinks') {
          endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data && data.meals) {
          // Obtém as primeiras 5 categorias de refeições
          setCategories(data.meals.slice(0, 5));
        } else if (data && data.drinks) {
          // Obtém as primeiras 5 categorias de bebidas
          setCategories(data.drinks.slice(0, 5));
        }
      } catch (error) {
        console.error('Erro ao obter as categorias:', error);
      }
    }

    fetchCategories(); // Chama a função de obtenção de categorias
  }, [location.pathname]); // Executa quando o pathname mu

  // função para filtrar as categorias do estado recipes do context
  async function handleCategoryClick(category:any) {
    try {
      let endpoint = '';
      if (location.pathname === '/meals') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      }
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.meals || data.drinks) {
        setRecipes(data.meals || data.drinks);
      }
    } catch (error) {
      console.log('Erro ao filtrar receitas');
    }
  //   const recipesFiltradas = providerValue.recipes
  //     .filter((recipe:any) => recipe.category === category);
  //   providerValue.setRecipes(recipesFiltradas);
  }
  return (
    <div>

      {categories.map((categoryName: any) => (
        <button
          key={ categoryName.strCategory }
          data-testid={ `${categoryName.strCategory}-category-filter` }
          onClick={ () => handleCategoryClick(categoryName.strCategory) }
        >
          {categoryName.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => setRecipes([]) }
      >
        All
      </button>

    </div>
  );
}

export default CategoryFilterBottons;
