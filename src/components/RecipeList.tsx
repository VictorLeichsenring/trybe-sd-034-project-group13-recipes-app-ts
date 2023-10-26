// a ideia é que este componente renderize a lista de 12 receitas somente
// ele vai ser chamado dentro do componente SearchBar

// novo componente RecipeList que aceita um array de receitas como propriedade.
// Dentro de RecipeList, usa o slice(0, 12) para pegar as 12 primeiras receitas.
// Para cada receita, renderiza uma div contendo a imagem e o nome da receita.
// No  SearchBar, importa e usa o componente RecipeList embaixo do botão de busca.Passamos as receitas achadas  como propriedade(searchResults.meals ou searchResults.drinks).
// abaixo com alguns ajustes deve retornar , as 12

// import React from 'react';

// function RecipeList({ recipes }) {
//   return (
//     <div>
//       {recipes.slice(0, 12).map((recipe, index) => (
//         <div key={ index } data-testid={ `${index}-recipe-card` }>
//           <img
//             src={ recipe.strMealThumb } // Substitua pelo campo correto da API
//             alt={ recipe.strMeal } // Substitua pelo campo correto da API
//             data-testid={ `${index}-card-img` }
//           />
//           <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
//           {' '}
//           {/* Substitua pelo campo correto da API */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RecipeList;
