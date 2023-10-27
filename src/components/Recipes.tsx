// Recipes.tsx
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

interface RecipesProps {
  image: string;
  name: string;
  index: number;
}

function Recipes({ image, name, index }: RecipesProps) {
  // requisito 20 hugo/joão inicio
  // a ideia foi usar o estado do context e filtrar a partir dele as categorias
  // estado recipe puxadodo context, location uxado, tem que descomentar no topo
  // const { providerValue } = useContext(RecipeContext);
  // const [categories, setCategories] = useState([]);
  // const location = useLocation();

  // função dentro do fetch para obter as categorias, esta usando async pois usa fetch
  // useEffect(() => {
  //   // Função para obter as categorias
  //   async function fetchCategories() {
  //     try {
  //       let endpoint = '';

  //       // Verifica se é a página de refeições ou bebidas e define o endpoint correspondente
  //       if (location.pathname === '/meals') {
  //         endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  //       } else if (location.pathname === '/drinks') {
  //         endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  //       }

  //       const response = await fetch(endpoint);
  //       const data = await response.json();

  //       if (data && data.meals) {
  //         // Obtém as primeiras 5 categorias de refeições
  //         setCategories(data.meals.slice(0, 5));
  //       } else if (data && data.drinks) {
  //         // Obtém as primeiras 5 categorias de bebidas
  //         setCategories(data.drinks.slice(0, 5));
  //       }
  //     } catch (error) {
  //       console.error('Erro ao obter as categorias:', error);
  //     }
  //   }

  //   fetchCategories(); // Chama a função de obtenção de categorias
  // }, [location.pathname]); // Executa quando o pathname muda

  // função para filtrar as categorias do estado recipes do context
  // function handleCategoryClick(category:any) {
  //   const recipesFiltradas = providerValue.recipes
  //     .filter((recipe:any) => recipe.category === category);
  //   providerValue.setRecipes(recipesFiltradas);
  // }
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      {/* //renderiza as categorias usando o estado recipes do context
    */}
      {/*
      {categories.map((category) => (
        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => handleCategoryClick(category.strCategory) }
        >
          {category.strCategory}
           */}
      {/* </button>
      ))}
      {providerValue.recipes.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }> */}
      {/* <img
            width="200px"
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>{recipe.name}</span>
        </div> */}
      {/* // ))} */}
      <img
        width="200px"
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

export default Recipes;
