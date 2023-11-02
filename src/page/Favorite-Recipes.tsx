import { Recipe } from '../hooks/useDoneRecipes';
import useFavoriteRecipes from '../hooks/useFavoriteRecipes';

function FavoriteRecipes() {
  const {
    filterRecipes,
    filteredRecipes,
  } = useFavoriteRecipes();
  return (
    <div>
      <h1>Receitas Favoritas</h1>
      <button data-testid="filter-by-all-btn" onClick={ () => filterRecipes('all') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => filterRecipes('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => filterRecipes('drink') }>
        Drinks
      </button>

      <div>
        {filteredRecipes.map((recipe:Recipe, index:number) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              width={ 200 }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality && `${recipe.nationality} - `}
              {recipe.category}
              {recipe.type === 'drink' && <span>{recipe.alcoholicOrNot}</span>}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              Compartilhar
            </button>
            <button data-testid={ `${index}-horizontal-favorite-btn` }>
              Favorito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FavoriteRecipes;
