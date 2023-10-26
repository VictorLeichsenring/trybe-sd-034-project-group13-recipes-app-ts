// RecipeCard.tsx
import React from 'react';
// import { useState, useEffect } from 'react';

interface RecipesProps {
  image: string;
  name: string;
  index: number;
}

function Recipes({ image, name, index }: RecipesProps) {
  // const [categories, setCategories] = useState([]);

  // useEffect(()=>{
  // async function fetchCategories(){
  //   try {
  //     let endpoint = '';
  //     if(location.pathname === '/meals'){
  //       endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  //     }else if (location.pathname==='/drinks'){
  //       endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  //     }
  //     const response = await fetch(endpoint);
  //     const data = await response.json();
  //   }
  // })
  // if (data && data.meals){
  // setCategories(data.meals.slice (0,5));
  // }else if (data && data.drinks){
  // setCategories(data.drinks.slice(0, 5));
  // }
  //  }catch(error){
  //   console.error('Erro ao obter categorias:', error);
  // }
  // }
  // fetchCategories()
  // }[location.pathname]);

  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      {/* {categories.map(category => (
        <button
          key={category.strCategory}
          data-testid={`${category.strCategory}-category-filter`}
          onClick={() => handleCategoryClick(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))} */}

      <img
        width="200px"
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

export default Recipes;
