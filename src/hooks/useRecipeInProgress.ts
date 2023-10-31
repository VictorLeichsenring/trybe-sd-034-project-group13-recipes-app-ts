import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../services/fetchData';
import { isRecipeInStorage, toggleFavoriteRecipe } from '../services/localStorageUtils';

type RecipeDetailType = {
  image: string;
  title: string;
  category: string;
} | null;

function useRecipeInProgress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailType>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const isMeal = location.pathname.includes('/meals/');

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
      setRecipeDetails({
        image: recipe.strMealThumb || recipe.strDrinkThumb,
        title: recipe.strMeal || recipe.strDrink,
        category: isMeal
          ? recipe.strCategory : `${recipe.strCategory} - ${recipe.strAlcoholic}`,
      });
    }
    fetchRecipeDetails();
  }, [id, location, isMeal]);

  return {
    isMeal,
    recipeDetails,
  };
}

export default useRecipeInProgress;
