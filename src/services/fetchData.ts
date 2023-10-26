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
    window.alert('Your search must contain only 1 (one) letter');
    return '';
  }

  const ENDPOINTS = path === '/meals' ? MEAL_ENDPOINTS : DRINK_ENDPOINTS;
  return ENDPOINTS[type] + qry;
}

async function fetchData(endpoint: EndpointType) {
  // try {
  //   const response = await fetch(endpoint);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   if (!data) {
  //     throw new Error("Sorry, we haven't found any recipes for these filters");
  //   }
  //   if (data.length > 12) {
  //     return data.slice(0, 12);
  //   }
  //   return data;
  // } catch (error: any) {
  //   window.alert(error.message);
  // }
  const response = await fetch(endpoint);
  return response.json();
}

export default fetchData;
