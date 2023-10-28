import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import fetchData from '../services/fetchData';

type RecipeDetailType = {
  image: string;
  title: string;
  category: string;
  ingredients: { ingredient: string; measure: string }[];
  instructions: string;
  video: string;
} | null;

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const isMeal = location.pathname.includes('/meals/');
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailType>(null);
  const [recommendations, setRecommendations] = useState([]);

  async function fetchRecommendations() {
    const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const MEAL_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const endpoint = isMeal ? DRINK_ENDPOINT : MEAL_ENDPOINT;
    const response = await fetch(endpoint);
    const data = await response.json();
    setRecommendations(isMeal ? data.drinks : data.meals);
  }

  function extractIngredients(recipe: any) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  useEffect(() => {
    function getEndpoint() {
      if (isMeal) return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    async function fetchRecipeDetails() {
      const endpoint = getEndpoint();
      const data = await fetchData(endpoint);
      const recipe = (data.meals && data.meals[0]) || (data.drinks && data.drinks[0]);

      if (!recipe) return;

      const ingredients = extractIngredients(recipe);

      setRecipeDetails({
        image: recipe.strMealThumb || recipe.strDrinkThumb,
        title: recipe.strMeal || recipe.strDrink,
        category: isMeal
          ? recipe.strCategory : `${recipe.strCategory} - ${recipe.strAlcoholic}`,
        ingredients,
        instructions: recipe.strInstructions,
        video: recipe.strYoutube ? `https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}` : '',
      });
    }

    fetchRecipeDetails();
  }, [id, location, isMeal]);

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={ recipeDetails.image }
        alt={ recipeDetails.title }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipeDetails.title}</h2>
      <span data-testid="recipe-category">{recipeDetails.category}</span>
      <ul>
        {recipeDetails.ingredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {item.ingredient}
            {' '}
            -
            {' '}
            {item.measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeDetails.instructions}</p>
      {recipeDetails.video && (
        <iframe
          width="420"
          height="315"
          src={ recipeDetails.video }
          data-testid="video"
          title="YouTube video player"
          allowFullScreen
        />
      )}
    </div>
  );
}
export default RecipeDetails;
