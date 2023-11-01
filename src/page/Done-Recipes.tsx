import React from 'react';
import { getFromLocalStorage } from '../services/localStorageUtils';

function DoneRecipes() {
  const doneRecipes = getFromLocalStorage('doneRecipes', []); // Obtenha as receitas feitas do localStorage

  return (
    <div>
      <h1>Receitas Feitas</h1>
      <div>
        {doneRecipes.map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
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
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Share

            </button>
            <div>
              {recipe.tags.map((tag, tagIndex) => (
                <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
