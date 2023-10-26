import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Recipes from '../components/Recipes';

function Drinks() {
  const { providerValue } = useContext(RecipeContext);

  return (
    <div>
      <div>
        {providerValue.recipes.length !== 0
        && providerValue.recipes.map((recipe: any, index: any) => (
          <Recipes
            key={ recipe.idDrink }
            image={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
}

export default Drinks;
