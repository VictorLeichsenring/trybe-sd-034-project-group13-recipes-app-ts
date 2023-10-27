import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const [titulo, setTitulo] = useState('');
  const [search, setSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState(true);

  useEffect(() => {
    switch (location.pathname) {
      case '/meals': setTitulo('Meals'); setSearch(true);
        break;
      case '/drinks': setTitulo('Drinks'); setSearch(true);
        break;
      case '/profile': setTitulo('Profile');
        break;
      case '/done-recipes': setTitulo('Done Recipes');
        break;
      case '/favorite-recipes': setTitulo('Favorite Recipes');
        break;
      default: setTitulo('Not Default');
    }
  }, [location]);

  return (
    <header>
      <h1 data-testid="page-title">
        {titulo}
      </h1>
      <Link
        to="/profile"
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      {search && (
        <button
          type="button"
          placeholder="Search Recipe"
          onClick={ () => setInputSearch(!inputSearch) }
        >
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {inputSearch && (
        <SearchBar />
      )}
    </header>

  );
}

export default Header;
