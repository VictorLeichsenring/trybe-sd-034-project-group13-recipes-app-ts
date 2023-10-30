import { EndpointParams, EndpointType } from '../types';

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

export function getEndpoint({
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

async function fetchData(endpoint: EndpointType) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export default fetchData;
