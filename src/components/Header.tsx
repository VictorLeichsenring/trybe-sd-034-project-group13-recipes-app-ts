import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoryFilterBottons from './CategoryFilterBottons';

function Header() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/meals': setTitle('Meals'); setSearch(true);
        break;
      case '/drinks': setTitle('Drinks'); setSearch(true);
        break;
      case '/profile': setTitle('Profile');
        break;
      case '/done-recipes': setTitle('Done Recipes');
        break;
      case '/favorite-recipes': setTitle('Favorite Recipes');
        break;
      default: setTitle('Not Default');
    }
  }, [location]);

  return (
    <header>
      <h1 data-testid="page-title">
        {title}
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
      <CategoryFilterBottons />
    </header>

  );
}

export default Header;
