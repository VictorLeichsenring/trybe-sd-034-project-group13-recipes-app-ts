import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../services/fetchData';
import {
  saveRecipeProgress,
  getRecipeProgress,
  toggleFavoriteRecipe,
  getFromLocalStorage,
  setToLocalStorage } from '../services/localStorageUtils';

type RecipeDetailType = {
  id: string;
  image: string;
  title: string;
  category: string;
  nationality: string;
  ingredients: { ingredient: string; measure: string }[];
  isAlcoholicOrNot: string;
  tags: string[];
} | null;

function useRecipeInProgress() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailType>(null);
  const isMeal = location.pathname.includes('/meals/');
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFinishButtonEnabled, setIsFinishButtonEnabled] = useState(false);

  useEffect(() => {
    if (recipeDetails && recipeDetails.ingredients) {
      setIsFinishButtonEnabled(
        checkedIngredients.length === recipeDetails.ingredients.length,
      );
    }
  }, [checkedIngredients, recipeDetails]);

  useEffect(() => {
    if (id) {
      const progress = getRecipeProgress(id, isMeal);
      setCheckedIngredients(progress);
    }
  }, [id, isMeal]);

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

  const handleCheckboxChange = (index: number) => {
    let updatedIngredients;

    if (checkedIngredients.includes(index)) {
      updatedIngredients = checkedIngredients.filter((item) => item !== index);
    } else {
      updatedIngredients = [...checkedIngredients, index];
    }

    setCheckedIngredients(updatedIngredients);

    if (id) {
      saveRecipeProgress(id, isMeal, updatedIngredients);
    }
  };
  useEffect(() => {
    function isRecipeFavorite() {
      const storedFavorites = localStorage.getItem('favoriteRecipes') || '[]';
      const parseFavorites = JSON.parse(storedFavorites);
      return parseFavorites.some((recipe: any) => recipe.id === id);
    }
    setIsFavorite(isRecipeFavorite());
  }, [id]);

  useEffect(() => {
    const getEndpoint = () => `https://www.${isMeal ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/lookup.php?i=${id}`;

    const getRecipeProperty = (
      recipe: any,
      mealProp: string,
      drinkProp: string,
    ) => (isMeal ? recipe[mealProp] : recipe[drinkProp]);

    async function fetchRecipeDetails() {
      if (!id) return;

      const endpoint = getEndpoint();

      const data = await fetchData(endpoint);

      const recipe = data.meals?.[0] || data.drinks?.[0];

      if (!recipe) return;

      const ingredients = extractIngredients(recipe);

      const tagsArray = (recipe.strTags || '')
        .split(',').filter((tag: string) => tag.trim());

      setRecipeDetails({
        id,
        nationality: recipe.strArea || '',
        title: getRecipeProperty(recipe, 'strMeal', 'strDrink'),
        category: isMeal
          ? recipe.strCategory
          : `${recipe.strCategory} - ${recipe.strAlcoholic}`,
        image: getRecipeProperty(recipe, 'strMealThumb', 'strDrinkThumb'),
        ingredients,
        isAlcoholicOrNot: recipe.strAlcoholic || '',
        tags: tagsArray,
      });

      const progress = getRecipeProgress(id, isMeal);
      setCheckedIngredients(progress);
    }

    fetchRecipeDetails();
  }, [id, isMeal]);

  function handleShareClick() {
    let recipeLink = window.location.href;
    recipeLink = recipeLink.replace('/in-progress', '');

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
  function handleFinishRecipe() {
    const currentDate = new Date().toISOString();
    if (!recipeDetails) return;
    const onlyCategory = isMeal
      ? recipeDetails.category : recipeDetails.category.split(' - ')[0];

    const recipeToAdd = {
      id,
      name: recipeDetails?.title || '',
      image: recipeDetails?.image || '',
      category: onlyCategory || '',
      nationality: recipeDetails?.nationality || '',
      alcoholicOrNot: recipeDetails?.isAlcoholicOrNot,
      doneDate: currentDate,
      tags: recipeDetails?.tags,
      type: isMeal ? 'meal' : 'drink',
    };
    const doneRecipes = getFromLocalStorage('doneRecipes') || [];
    doneRecipes.push(recipeToAdd);
    setToLocalStorage('doneRecipes', doneRecipes);
    navigate('/done-recipes');
  }
  return {
    isMeal,
    recipeDetails,
    checkedIngredients,
    messageCopied,
    isFavorite,
    handleCheckboxChange,
    handleShareClick,
    handleFavoriteClick,
    isFinishButtonEnabled,
    handleFinishRecipe,
  };
}

export default useRecipeInProgress;
