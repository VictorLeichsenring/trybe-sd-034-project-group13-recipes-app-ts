import { useEffect, useState } from 'react';
import RecipeContext from '../context/RecipeContext';
import fetchData from '../services/fetchData';

function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState([]);
  const providerValue = {
    recipes,
    setRecipes,
  };

  useEffect(() => {
    async function fetchApi() {
      const data = await fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      providerValue.setRecipes(data);
    }
    fetchApi();
  });

  return (
    <RecipeContext.Provider
      value={ { providerValue } }
    >
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
