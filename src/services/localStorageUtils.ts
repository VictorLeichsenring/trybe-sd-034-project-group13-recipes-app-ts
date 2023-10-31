type RecipeType = {
  id: string | undefined;
  [key: string]: any;
};

export function getFromLocalStorage(key: string, defaultValue: any = null): any {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function setToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set ${key} to localStorage:`, error);
  }
}

export function isRecipeInStorage(
  key: string,
  id: string | undefined,
  isMeal: boolean,
): boolean {
  const storedRecipes = getFromLocalStorage(key, []);

  if (key === 'inProgressRecipes' && id) {
    const category = isMeal ? 'meals' : 'drinks';
    return storedRecipes[category] && storedRecipes[category][id];
  }

  if (key === 'doneRecipes') {
    return storedRecipes.some((recipe: RecipeType) => recipe.id === id);
  }

  return false;
}

export function toggleFavoriteRecipe(
  recipeDetails: any,
  id: string,
  isMeal: boolean,
): void {
  const storedFavorites = getFromLocalStorage('favoriteRecipes', []);
  const isAlreadyFavorited = storedFavorites.some((
    recipe: RecipeType,
  ) => recipe.id === id);

  if (isAlreadyFavorited) {
    const newFavorites = storedFavorites.filter((recipe: RecipeType) => recipe.id !== id);
    setToLocalStorage('favoriteRecipes', newFavorites);
  } else {
    const recipeToFavorite = {
      id,
      type: isMeal ? 'meal' : 'drink',
      nationality: recipeDetails.nationality,
      category: recipeDetails?.category.split(' - ')[0],
      alcoholicOrNot: isMeal ? '' : recipeDetails.category.split(' - ')[1],
      name: recipeDetails?.title,
      image: recipeDetails?.image,
    };

    setToLocalStorage('favoriteRecipes', [...storedFavorites, recipeToFavorite]);
  }
}

export function saveRecipeProgress(
  id: string,
  isMeal: boolean,
  ingredients: number[],
): void {
  const inProgress = getFromLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
  const category = isMeal ? 'meals' : 'drinks';

  inProgress[category][id] = ingredients;

  setToLocalStorage('inProgressRecipes', inProgress);
}

export function getRecipeProgress(
  id: string,
  isMeal: boolean,
): number[] {
  const inProgress = getFromLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });
  const category = isMeal ? 'meals' : 'drinks';
  return inProgress[category]?.[id] || [];
}
