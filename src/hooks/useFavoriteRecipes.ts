import { useState } from 'react';
import { Recipe } from './useDoneRecipes';
import { getFromLocalStorage } from '../services/localStorageUtils';

function useFavoriteRecipes() {
  const favoriteRecipes = getFromLocalStorage('favoriteRecipes', []);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);
  const [copyMessage, setCopyMessage] = useState('');

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

  function handleShareClick(type: 'meal' | 'drink', id: string) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyMessage('Link copied!');
  }

  return {
    favoriteRecipes,
    filteredRecipes,
    filterRecipes,
    handleShareClick,
    copyMessage,
  };
}

export default useFavoriteRecipes;
