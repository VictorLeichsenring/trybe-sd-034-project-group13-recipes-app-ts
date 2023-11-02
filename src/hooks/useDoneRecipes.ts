import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../services/localStorageUtils';

export type Recipe = {
  type: 'meal' | 'drink';
  image: string;
  name: string;
  nationality?: string;
  category: string;
  alcoholicOrNot?: string;
  doneDate: string;
  tags: string[];
  id: string;
};

export function useDoneRecipes() {
  const navigate = useNavigate();
  const doneRecipes = getFromLocalStorage('doneRecipes', []); // Obtenha as receitas feitas do localStorage
  const [copyMessage, setCopyMessage] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(doneRecipes);

  // filtros para a 48,
  const meals = doneRecipes.filter((recipe:Recipe) => recipe.type === 'meal');
  const drinks = doneRecipes.filter((recipe:Recipe) => recipe.type === 'drink');

  function handleShareClickDone(type: 'meal' | 'drink', id: string) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyMessage('Link copied!');
  }

  function filterRecipes(type: 'meal' | 'drink' | 'all') {
    if (type === 'meal') {
      console.log('meal', meals);
      setFilteredRecipes(meals);
    } else if (type === 'drink') {
      console.log('drink', drinks);
      setFilteredRecipes(drinks);
    } else {
      console.log('all', doneRecipes);
      setFilteredRecipes(doneRecipes);
    }
  }
  function handleRecipeClick(type: 'meal' | 'drink', id: string) {
    navigate(`/${type}s/${id}`);
  }

  return {
    doneRecipes,
    meals,
    drinks,
    copyMessage,
    handleShareClickDone,
    filterRecipes,
    filteredRecipes,
    handleRecipeClick,
  };
}
