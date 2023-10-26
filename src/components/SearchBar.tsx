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
          console.log('oi');

          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
          console.log(endpoint);

          break;
        case 'name':
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
          console.log(endpoint);
          break;
        case 'first-letter':
          console.log(query.length);

          if (query.length > 1) {
            window.alert('Your search must have only 1 (one) character');
          }
          endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
          console.log(endpoint);
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
          }
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`;
          break;
        default:
          break;
      }
      console.log(endpoint);

      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);

      // try {
      //   console.log('aiii');
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }

  // const handleSearch = async () => {
  //   const basePath = location.pathname === '/meals' ? 'https://www.themealdb.com' : 'https://www.thecocktaildb.com';
  //   let endpoint = '';

  //   switch (searchType) {
  //     case 'ingredient':
  //       endpoint = `${basePath}/api/json/v1/1/filter.php?i=${query}`;
  //       break;
  //     case 'name':
  //       endpoint = `${basePath}/api/json/v1/1/search.php?s=${query}`;
  //       break;
  //     case firstLetter:
  //       if (query.length !== 1) {
  //         window.alert('Your search must have only 1 (one) character');
  //       } else {
  //         endpoint = `${basePath}}/api/json/v1/1/search.php?f=${query}`;
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   if (endpoint) {
  //     const response = await fetch(endpoint);
  //     const data = await response.json();

  //     if (data && data.length === 1) {
  //       const recipeId = data[0].idMeal || data[0].idDrink;

  //       if (location.pathname === '/meals') {
  //         navigate(`/meals/${recipeId}`); // Redirecionando para a rota de detalhes
  //       } else if (location.pathname === '/drinks') {
  //         navigate(`/drinks/${recipeId}`); // Redirecionando para a rota de detalhes
  //       }
  //     }
  //   }

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
