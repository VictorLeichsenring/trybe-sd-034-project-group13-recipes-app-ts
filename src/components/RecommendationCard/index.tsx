import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationCard.css';

type RecommendationType = {
  strDrinkThumb?: string;
  strMealThumb?: string;
  strDrink?: string;
  strMeal?: string;
};

function RecommendationCard({
  recommendation,
  index,
  isMeal,
}: {
  recommendation: RecommendationType;
  index: number;
  isMeal: boolean;
}) {
  return (
    <div
      className="recommendation-card"
      data-testid={ `${index}-recommendation-card` }
    >
      <img
        src={ isMeal ? recommendation.strDrinkThumb : recommendation.strMealThumb }
        alt={ isMeal ? recommendation.strDrink : recommendation.strMeal }
      />
      <span data-testid={ `${index}-recommendation-title` }>
        {isMeal ? recommendation.strDrink : recommendation.strMeal}
      </span>
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendation: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecommendationCard;
