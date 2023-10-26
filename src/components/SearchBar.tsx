import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function SearchBar() {
  const location = useLocation();
  const [searchType, setSearchType] = useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  // const firstLetter = 'first-letter';

  async function handleSearch() {
    let endpoint = '';

    if (location.pathname === '/meals') {
      switch (searchType) {
        case 'ingredient':
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;

          break;
        case 'name':
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

          break;
        case 'first-letter':

          if (query.length > 1) {
            window.alert('Your search must have only 1 (one) character');
            break;
          } else {
            endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
          }
          break;
        default:
          break;
      }
    } else if (location.pathname === '/drinks') {
      switch (searchType) {
        case 'ingredient':
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
          break;
        case 'name':
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
          break;
        case 'first-letter':
          if (query.length > 1) {
            window.alert('Your search must have only 1 (one) character');
          } else {
            endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
          }
          break;
        default:
          break;
      }
    }
    if (endpoint) {
      const response = await fetch(endpoint);
      const data = await response.json();

      // Por exemplo, suponhamos que a resposta esteja em `data.meals` para comidas e `data.drinks` para bebidas.
      if (location.pathname === '/meals' && data.meals && data.meals.length === 1) {
        const mealId = data.meals[0].idMeal;
        navigate(`/meals/${mealId}`);
      } else if (location.pathname === '/drinks' && data.drinks && data.drinks.length === 1) {
        const drinkId = data.drinks[0].idDrink;
        navigate(`/drinks/${drinkId}`);
      }
    }
  }

  return (
    <div>
      <input
        data-testid="search-input"
        value={ query }
        onChange={ (e) => setQuery(e.target.value) }
      />

      <label htmlFor="ingredient">Ingredient</label>
      <input
        type="radio"
        id="ingredient"
        value="ingredient"
          // name="search-bar"
        data-testid="ingredient-search-radio"
        checked={ searchType === 'ingredient' }
        onChange={ () => setSearchType('ingredient') }
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        id="name"
        value="name"
          // name="search-bar"
        data-testid="name-search-radio"
        checked={ searchType === 'name' }
        onChange={ () => setSearchType('name') }
      />
      <label htmlFor="first-letter">First letter</label>
      <input
        type="radio"
        id="firstLetter"
        value="first-letter"
          // name="search-bar"
        data-testid="first-letter-search-radio"
        checked={ searchType === 'first-letter' }
        onChange={ () => setSearchType('first-letter') }
      />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleSearch }
      >
        Buscar

      </button>
    </div>

  );
}

// export default SearchBar;
