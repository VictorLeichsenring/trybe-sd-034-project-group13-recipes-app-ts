import { useContext, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';
import fetchData from '../services/fetchData';

function Drinks() {
  const { providerValue } = useContext(RecipeContext);

  useEffect(() => {
    async function InitialState() {
      if (providerValue.recipes.length === 0) {
        const endepoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const data = await fetchData(endepoint);

        if (data.drinks.length > 12) {
          providerValue.setRecipes(data.drinks.slice(0, 12));
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
            key={ recipe.idDrink }
            image={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            index={ index }
            id={ recipe.idDrink }
            type="drink"
          />
        ))}
      </div>
    </div>
  );
}

export default Drinks;
