import { useContext, useEffect } from 'react';

import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import fetchData from '../services/fetchData';

function Meals() {
  const { providerValue } = useContext(RecipeContext);
  useEffect(() => {
    async function InitialState() {
      if (providerValue.recipes.length === 0) {
        const endepoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const data = await fetchData(endepoint);
        if (data.meals.length > 12) {
          providerValue.setRecipes(data.meals.slice(0, 12));
        }
      }
    }
    InitialState();
  }, [providerValue]);

  return (
    <div>
      <div>
        {providerValue.recipes.length !== 0
        && providerValue.recipes.slice(0, 12).map((recipe: any, index: any) => (
          <Recipes
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            name={ recipe.strMeal }
            index={ index }
            id={ recipe.idMeal }
            type="meal"
          />
        ))}
      </div>
    </div>
  );
}

export default Meals;
