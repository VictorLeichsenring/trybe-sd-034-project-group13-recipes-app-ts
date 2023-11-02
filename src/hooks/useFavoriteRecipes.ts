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

  return {
    favoriteRecipes,
    filteredRecipes,
    filterRecipes,
  };
}

export default useFavoriteRecipes;
