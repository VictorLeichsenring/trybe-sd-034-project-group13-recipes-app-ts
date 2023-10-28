// Recipes.tsx

interface RecipesProps {
  image: string;
  name: string;
  index: number;
}

function Recipes({ image, name, index }: RecipesProps) {
  return (
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
  );
}

export default Recipes;
