import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import fetchData from '../../services/fetchData';
import RecommendationCard from '../../components/RecommendationCard';
import './RecipeDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type RecipeDetailType = {
  image: string;
  title: string;
  category: string;
  isAlcoholicOrNot: string;
  nationality: string;
  ingredients: { ingredient: string; measure: string }[];
  instructions: string;
  video: string;
} | null;

function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isMeal = location.pathname.includes('/meals/');
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailType>(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recipeDone, setRecipeDone] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(true);
  const [messageCopied, setMessageCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  function extractIngredients(recipe: any) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  }

  function handleStartRecipe() {
    if (isMeal) {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  }

  useEffect(() => {
    function isRecipeInStorage(key: string) {
      try {
        const storedRecipes = localStorage.getItem(key);
        if (!storedRecipes) {
          return false;
        }
        const parseData = JSON.parse(storedRecipes) || [];

        if (key === 'inProgressRecipes' && id) {
          const category = isMeal ? 'meals' : 'drinks';
          return parseData[category] && parseData[category][id];
        }

        if (key === 'doneRecipes') {
          return parseData.some((
            recipe: { id: string | undefined; },
          ) => recipe.id === id);
        }
        return false;
      } catch (error) {
        console.log(`Falha ao converter${key}`);
        return false;
      }
    }
    setRecipeDone(isRecipeInStorage('doneRecipes'));
    setRecipeInProgress(isRecipeInStorage('inProgressRecipes'));
  }, [id, isMeal]);

  useEffect(() => {
    async function fetchRecommendations() {
      const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const MEAL_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const endpoint = isMeal ? DRINK_ENDPOINT : MEAL_ENDPOINT;
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecommendations(isMeal ? data.drinks : data.meals);
    }

    fetchRecommendations();
  }, [isMeal]);

  useEffect(() => {
    function getEndpoint() {
      if (isMeal) return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    async function fetchRecipeDetails() {
      const endpoint = getEndpoint();
      const data = await fetchData(endpoint);
      const recipe = (data.meals && data.meals[0]) || (data.drinks && data.drinks[0]);

      if (!recipe) return;

      const ingredients = extractIngredients(recipe);

      setRecipeDetails({
        image: recipe.strMealThumb || recipe.strDrinkThumb,
        title: recipe.strMeal || recipe.strDrink,
        category: isMeal
          ? recipe.strCategory : `${recipe.strCategory} - ${recipe.strAlcoholic}`,
        alcoholicOrNot: recipe.strAlcoholic || '',
        nationality: recipe.strArea || '',
        ingredients,
        instructions: recipe.strInstructions,
        video: recipe.strYoutube ? `https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}` : '',
      });
    }

    fetchRecipeDetails();
  }, [id, location, isMeal]);

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  function handleShareClick() {
    const recipeLink = window.location.href;

    // copiar para o clipboard
    navigator.clipboard.writeText(recipeLink);

    // seta estado
    setMessageCopied(true);
  }

  function handleFavoriteClick() {
    const storedFavorites = localStorage.getItem('favoriteRecipes') || '[]';
    const parseFavorite = JSON.parse(storedFavorites);
    if (recipeDetails) {
      const recipeToFavorite = {
        id,
        type: isMeal ? 'meal' : 'drink',
        nationality: recipeDetails.nationality,
        category: recipeDetails?.category.split(' - ')[0],
        alcoholicOrNot: isMeal ? '' : recipeDetails.category.split(' - ')[1],
        name: recipeDetails?.title,
        image: recipeDetails?.image,
      };

      const isAlreadyFavorited = parseFavorite.some((recipe: any) => recipe.id === id);
      if (isAlreadyFavorited) {
        const newFavorites = parseFavorite.filter((recipe: any) => recipe.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...parseFavorite, recipeToFavorite]),
        );
      }
    }
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
          data-testid="favorite-btn"
          onClick={ handleFavoriteClick }
        >
          {isFavorite
            ? <img src={ blackHeartIcon } alt="Favoritar" />
            : <img src={ whiteHeartIcon } alt="Desfavoritar" />}
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
            >
              Continue Recipe
            </button>

          )
        }
    </div>
  );
}
export default RecipeDetails;
