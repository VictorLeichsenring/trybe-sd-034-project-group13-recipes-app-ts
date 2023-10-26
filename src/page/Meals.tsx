import { useContext, useEffect } from 'react';

import RecipeCard from '../components/RecipeCard';
import RecipeContext from '../context/RecipeContext';
import fetchData from '../services/fetchData';

function Meals() {
  // const [recipes, setRecipes] = useState<Array<any>>([]);
  const { providerValue } = useContext(RecipeContext);

  return (
    <div>
      <h1>Meals</h1>
      <div>
        {providerValue.recipes.length !== 0
        && providerValue.recipes.meals.slice(0, 12).map((recipe: any, index: any) => (
          <RecipeCard
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
