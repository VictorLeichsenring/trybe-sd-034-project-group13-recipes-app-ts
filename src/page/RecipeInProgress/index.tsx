import useRecipeInProgress from '../../hooks/useRecipeInProgress';

function RecipeInProgress() {
  const {
    recipeDetails,
    checkedIngredients,
    handleCheckboxChange,
  } = useRecipeInProgress();

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={ recipeDetails.image }
        alt={ recipeDetails.title }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipeDetails.title}</h2>
      <span
        data-testid="recipe-category"
      >
        {recipeDetails.category}
      </span>
      <div>
        <button data-testid="share-btn">Compartilhar</button>
        <button>
          Favorite Recipe
          <img
            data-testid="favorite-btn"
            // src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
            alt="favorite icon"
          />
        </button>
      </div>
      <ul>
        {recipeDetails.ingredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={
              { textDecoration: checkedIngredients.includes(index)
                ? 'line-through solid rgb(0, 0, 0)'
                : 'none' }
            }
          >
            <input
              type="checkbox"
              value={ item.ingredient }
              onChange={ () => handleCheckboxChange(index) }
              checked={ checkedIngredients.includes(index) }
            />
            {item.ingredient}
            {' '}
            -
            {' '}
            {item.measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">Instruções</p>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
