import { useState } from 'react';
import RecipeContext from '../context/RecipeContext';

function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState([]);

  const providerValue = {
    recipes,
    setRecipes,

  };

  return (
    <RecipeContext.Provider
      value={ { providerValue } }
    >
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
