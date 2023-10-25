function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" />
      <input
        type="radio"
        id="ingredient"
        value="ingredient"
        name="search-bar"
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        type="radio"
        id="name"
        value="name"
        name="search-bar"
        data-testid="name-search-radio"
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        id="first-letter"
        value="first-letter"
        name="search-bar"
        data-testid="first-letter-search-radio"
      />
      <label htmlFor="first-letter">First letter</label>
      <button data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default SearchBar;
