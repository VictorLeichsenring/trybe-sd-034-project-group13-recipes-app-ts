import { useState } from 'react';
import { Recipe } from './useDoneRecipes';
import { getFromLocalStorage } from '../services/localStorageUtils';

function useFavoriteRecipes() {
  const favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  function filterRecipes(type: 'meal' | 'drink' | 'all') {
    if (type === 'meal') {
      setFilteredRecipes(favoriteRecipes.filter(
        (recipe: Recipe) => recipe.type === 'meal',
      ));
    } else if (type === 'drink') {
      setFilteredRecipes(favoriteRecipes.filter(
        (recipe: Recipe) => recipe.type === 'drink',
      ));
    } else {
      setFilteredRecipes(favoriteRecipes);
    }
  }

  function handleShareClick(recipe: Recipe) {
    const recipeUrl = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(recipeUrl);
    alert('Link copied!');
  }

  return {
    favoriteRecipes,
    filteredRecipes,
    filterRecipes,
    handleShareClick,
  };
}

export default useFavoriteRecipes;
