import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';

function Meals() {
  const { providerValue } = useContext(RecipeContext);

  return (
    <div>
      <div>
        {providerValue.recipes.length !== 0
        && providerValue.recipes.map((recipe: any, index: any) => (
          <Recipes
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            name={ recipe.strMeal }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
}

export default Meals;
