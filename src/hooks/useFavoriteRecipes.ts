import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './useDoneRecipes';
import { getFromLocalStorage, setToLocalStorage } from '../services/localStorageUtils';

function useFavoriteRecipes() {
  const navigate = useNavigate();
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

  function unfavoriteRecipe(id: string) {
    const updatedFavorites = favoriteRecipes.filter((recipe:Recipe) => recipe.id !== id);
    setToLocalStorage('favoriteRecipes', updatedFavorites);
    setFilteredRecipes(updatedFavorites);
  }

  function handleRecipeClick(type: 'meal' | 'drink', id: string) {
    navigate(`/${type}s/${id}`);
  }

  return {
    favoriteRecipes,
    filteredRecipes,
    filterRecipes,
    handleShareClick,
    copyMessage,
    unfavoriteRecipe,
    handleRecipeClick,
  };
}

export default useFavoriteRecipes;
