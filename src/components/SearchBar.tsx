import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LocationType,
  SearchType,
} from '../types';
import RecipeContext from '../context/RecipeContext';
import fetchData, { getEndpoint } from '../services/fetchData';

function SearchBar() {
  const location:LocationType = useLocation();
  const { providerValue } = useContext(RecipeContext);
  const [searchType, setSearchType] = useState<SearchType>('ingredient');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const FIRST_LETTER = 'first-letter';

  async function handleSearch() {
    const endpoint = getEndpoint({
      pathname: location.pathname,
      searchType,
      query,
    });

    if (!endpoint) return;

    const data = await fetchData(endpoint);
    providerValue.setRecipes(data);

    // if (location.pathname === '/meals'
    // && data.meals === null) {
    //   window.alert(mensagem);
    // }

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
        data-testid="ingredient-search-radio"
        checked={ searchType === 'ingredient' }
        onChange={ () => setSearchType('ingredient') }
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        id="name"
        value="name"
        data-testid="name-search-radio"
        checked={ searchType === 'name' }
        onChange={ () => setSearchType('name') }
      />
      <label htmlFor="first-letter">First letter</label>
      <input
        type="radio"
        id={ FIRST_LETTER }
        value={ FIRST_LETTER }
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
