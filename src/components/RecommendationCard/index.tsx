import React from 'react';
import PropTypes from 'prop-types';
import './RecommendationCard.css';

function RecommendationCard({ recommendation, index, isMeal }) {
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
  recommendation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
};

export default RecommendationCard;
