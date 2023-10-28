import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import fetchData from '../services/fetchData';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      let endpoint = '';

      // Determina o endpoint baseado na rota atual
      if (location.pathname.includes('/meals/')) {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks/')) {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }

      const data = await fetchData(endpoint);

      if (data && data.meals) {
        setRecipeDetails(data.meals[0]);
      } else if (data && data.drinks) {
        setRecipeDetails(data.drinks[0]);
      }
    }

    fetchDetails();
  }, [id, location.pathname]);

  if (!recipeDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipeDetails.strMeal || recipeDetails.strDrink}</h1>
    </div>
  );
}
export default RecipeDetails;
