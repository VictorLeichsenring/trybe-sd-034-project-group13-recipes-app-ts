import { useState } from 'react';
import RecipeContext from '../context/RecipeContext';

function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories, // Função para atualizar os ingredi
  ] = useState([]);
  const providerValue = {
    recipes,
    setRecipes,
    categories, // Adicionado estado de ingredientes
    setCategories, // Função para atualizar os ingredi
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
