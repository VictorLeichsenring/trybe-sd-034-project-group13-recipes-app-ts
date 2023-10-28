// Recipes.tsx

import { Link } from 'react-router-dom';

interface RecipesProps {
  image: string;
  name: string;
  index: number;
  id: string;
  type: 'meal' | 'drink';
}

function Recipes({ image, name, index, id, type }: RecipesProps) {
  return (
    <Link to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }>
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          width="200px"
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{name}</span>
      </div>
    </Link>
  );
}

export default Recipes;
