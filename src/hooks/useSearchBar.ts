import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LocationType,
  SearchType,
} from '../types';
import RecipeContext from '../context/RecipeContext';
import fetchData, { getEndpoint } from '../services/fetchData';

function useSearhBar() {
  const location: LocationType = useLocation();
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

    const pathnameWithBar = location.pathname;
    const pathnameWithOutBar = pathnameWithBar.replace('/', '');

    if (data[pathnameWithOutBar]) {
      if (data[pathnameWithOutBar].length > 0) {
        providerValue.setRecipes(data[pathnameWithOutBar]);
      }
      if (data[pathnameWithOutBar].length > 12) {
        providerValue.setRecipes(data[pathnameWithOutBar].slice(0, 12));
      }
      if (data[pathnameWithOutBar].length > 0 && data[pathnameWithOutBar].length < 12) {
        providerValue.setRecipes(data[pathnameWithOutBar]);
      }
    }
    if (!data[pathnameWithOutBar]) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }

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
    {
      query,
      setQuery,
      searchType,
      setSearchType,
      FIRST_LETTER,
      handleSearch,
    }
  );
}

export default useSearhBar;
