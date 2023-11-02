import { useState } from 'react';
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
  const doneRecipes = getFromLocalStorage('doneRecipes', []); // Obtenha as receitas feitas do localStorage
  const [copyMessage, setCopyMessage] = useState('');

  // filtros para a 48,
  const meals = doneRecipes.filter((recipe:Recipe) => recipe.type === 'meal');
  const drink = doneRecipes.filter((recipe:Recipe) => recipe.type === 'drink');

  function handleShareClickDone(type: 'meal' | 'drink', id: string) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyMessage('Link copied!');
  }

  return {
    doneRecipes,
    meals,
    drink,
    copyMessage,
    handleShareClickDone,
  };
}
