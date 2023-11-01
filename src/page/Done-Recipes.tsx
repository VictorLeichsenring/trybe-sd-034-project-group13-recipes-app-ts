import React, { useState } from 'react';
import { getFromLocalStorage } from '../services/localStorageUtils';

function DoneRecipes() {
  const doneRecipes = getFromLocalStorage('doneRecipes', []); // Obtenha as receitas feitas do localStorage
  const [copyMessage, setCopyMessage] = useState('');

  function handleShareClickDone(type, id) {
    const recipeUrl = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopyMessage('Link copied!');
  }

  return (
    <div>
      <h1>Receitas Feitas</h1>
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        {doneRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              width={ 200 }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
              {' '}
              {recipe.type === 'drink' && <span>{recipe.alcoholicOrNot}</span>}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <div>
              {recipe.tags.map((tag, tagIndex) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={ () => handleShareClickDone(recipe.type, recipe.id) }
            >
              <img
                src="src/images/shareIcon.svg"
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        ))}
      </div>
      {copyMessage && <div>{copyMessage}</div>}
    </div>
  );
}

export default DoneRecipes;
