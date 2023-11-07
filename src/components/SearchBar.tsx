import useSearhBar from '../hooks/useSearchBar';

function SearchBar() {
  const {
    query,
    setQuery,
    searchType,
    setSearchType,
    FIRST_LETTER,
    handleSearch,
  } = useSearhBar();

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ query }
        onChange={ (e) => setQuery(e.target.value) }
        placeholder="pesquisa"
        id="inputCampo"
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

export default SearchBar;
