import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LocationType,
  SearchType,
  EndpointParams,
  EndpointType,
} from '../types';

function SearchBar() {
  const location:LocationType = useLocation();
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const FIRST_LETTER = 'first-letter';

  const MEAL_ENDPOINTS = {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    [FIRST_LETTER]: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  };

  const DRINK_ENDPOINTS = {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    [FIRST_LETTER]: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
  };

  function getEndpoint({
    pathname: path,
    searchType: type,
    query: qry }: EndpointParams): string {
    if (type === 'first-letter' && qry.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return '';
    }

    const ENDPOINTS = path === '/meals' ? MEAL_ENDPOINTS : DRINK_ENDPOINTS;
    return ENDPOINTS[type] + qry;
  }

  async function fetchData(endpoint:EndpointType) {
    const response = await fetch(endpoint);
    return response.json();
  }

  async function handleSearch() {
    const endpoint = getEndpoint({
      pathname: location.pathname,
      searchType,
      query,
    });

    if (!endpoint) return;

    const data = await fetchData(endpoint);
    console.log(data);

    if (location.pathname === '/meals'
    && data.meals
    && data.meals.length === 1) {
      navigate(`/meals/${data.meals[0].idMeal}`);
    } else if (location.pathname === '/drinks'
    && data.drinks
    && data.drinks.length === 1) {
      navigate(`/drinks/${data.drinks[0].idDrink}`);
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
        id={ FIRST_LETTER }
        value={ FIRST_LETTER }
          // name="search-bar"
        data-testid="first-letter-search-radio"
        checked={ searchType === FIRST_LETTER }
        onChange={ () => setSearchType(FIRST_LETTER) }
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

export default SearchBar;
