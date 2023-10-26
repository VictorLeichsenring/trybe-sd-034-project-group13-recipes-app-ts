// RecipeCard.tsx
import React from 'react';

interface RecipeCardProps {
  image: string;
  name: string;
  index: number;
}

function RecipeCard({ image, name, index }: RecipeCardProps) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

export default RecipeCard;
