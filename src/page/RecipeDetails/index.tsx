import RecommendationCard from '../../components/RecommendationCard';
import './RecipeDetails.css';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useRecipeDetails from '../../hooks/useRecipeDetails';

function RecipeDetails() {
  const {
    isMeal,
    recipeDetails,
    recommendations,
    recipeDone,
    recipeInProgress,
    messageCopied,
    isFavorite,
    handleStartRecipe,
    handleShareClick,
    handleFavoriteClick,
  } = useRecipeDetails();

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <button
          data-testid="share-btn"
          onClick={ handleShareClick }
        >
          Compartilhar
        </button>

        <button
          onClick={ handleFavoriteClick }

        >
          Favorite Recipe
          <img
            data-testid="favorite-btn"
            src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
            alt="favorite icon"
          />
        </button>
        <img
          src={ recipeDetails.image }
          alt={ recipeDetails.title }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{recipeDetails.title}</h2>
        <span data-testid="recipe-category">
          {recipeDetails.isAlcoholicOrNot
            ? `${recipeDetails.title} - {${recipeDetails.isAlcoholicOrNot}}`
            : recipeDetails.category}
        </span>
        <ul>
          {recipeDetails.ingredients.map((item, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {item.ingredient}
              {' '}
              -
              {' '}
              {item.measure}
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipeDetails.instructions}</p>
        {recipeDetails.video && (
          <iframe
            width="420"
            height="315"
            src={ recipeDetails.video }
            data-testid="video"
            title="YouTube video player"
            allowFullScreen
          />
        )}
      </div>
      <div className="recommendations-section">
        {recommendations.slice(0, 6).map((recommendation, index) => (
          <RecommendationCard
            key={ index }
            recommendation={ recommendation }
            index={ index }
            isMeal={ isMeal }
          />
        ))}
      </div>
      {
        messageCopied && (
          <div
            id="copy-message"
          >
            Link copied!
          </div>
        )
      }
      {
          !recipeDone && !recipeInProgress && (
            <button
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
              onClick={ handleStartRecipe }
            >
              Start Recipe
            </button>
          )
        }
      {
          recipeInProgress && (
            <button
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
              onClick={ handleStartRecipe }
            >
              Continue Recipe
            </button>

          )
        }
    </div>
  );
}
export default RecipeDetails;
