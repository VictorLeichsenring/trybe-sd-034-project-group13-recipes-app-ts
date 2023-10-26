import React, { useState, useCallback } from 'react';

import RecipeCard from '../components/RecipeCard';

function Meals() {
  const [recipes, setRecipes] = useState<Array<any>>([]);

  const handleSearchResults = useCallback((data: any) => {
    if (data.meals && data.meals.length > 0) {
      setRecipes(data.meals);
    }
  }, []);

  return (
    <div>
      <h1>Meals</h1>
      {/* <SearchBar onSearch={ handleSearchResults } /> */}
      <div>
        {recipes.slice(0, 12).map((recipe, index) => (
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
