import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../services/fetchData';
import {
  isRecipeInStorage,
  toggleFavoriteRecipe,
} from '../services/localStorageUtils';

type RecipeDetailType = {
  image: string;
  title: string;
  category: string;
  isAlcoholicOrNot: string;
  nationality: string;
  ingredients: { ingredient: string; measure: string }[];
  instructions: string;
  video: string;
} | null;

function useRecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isMeal = location.pathname.includes('/meals/');
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailType>(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recipeDone, setRecipeDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(true);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  function handleStartRecipe() {
    if (isMeal) {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  }

  useEffect(() => {
    setRecipeDone(isRecipeInStorage('doneRecipes', id, isMeal));
    setRecipeInProgress(isRecipeInStorage('inProgressRecipes', id, isMeal));
  }, [id, isMeal]);

  useEffect(() => {
    async function fetchRecommendations() {
      const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const MEAL_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const endpoint = isMeal ? DRINK_ENDPOINT : MEAL_ENDPOINT;
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecommendations(isMeal ? data.drinks : data.meals);
    }

    fetchRecommendations();
  }, [isMeal]);

  useEffect(() => {
    function isRecipeFavorite() {
      const storedFavorites = localStorage.getItem('favoriteRecipes') || '[]';
      const parseFavorites = JSON.parse(storedFavorites);
      console.log(parseFavorites);
      return parseFavorites.some((recipe: any) => recipe.id === id);
    }
    setIsFavorite(isRecipeFavorite());
  }, [id]);

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
        isAlcoholicOrNot: recipe.strAlcoholic || '',
        nationality: recipe.strArea || '',
        ingredients,
        instructions: recipe.strInstructions,
        video: recipe.strYoutube ? `https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}` : '',
      });
    }

    fetchRecipeDetails();
  }, [id, location, isMeal]);

  function handleShareClick() {
    const recipeLink = window.location.href;

    // copiar para o clipboard
    navigator.clipboard.writeText(recipeLink);

    // seta estado
    setMessageCopied(true);
  }

  function handleFavoriteClick() {
    if (recipeDetails && id) {
      toggleFavoriteRecipe(recipeDetails, id, isMeal);
      setIsFavorite(!isFavorite);
    }
  }

  return {
    isMeal,
    recipeDetails,
    recommendations,
    recipeDone,
    recipeInProgress,
    messageCopied,
    isFavorite,
    handleStartRecipe,
    handleShareClick,
    handleFavoriteClick,
  };
}

export default useRecipeDetails;
