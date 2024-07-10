// src/components/MealFilter.js
import React from 'react';
import mealsData from '../data/meals.json';
import './MealFilter.css';

// Extract labels from the dataset
const categories = ["All", ...mealsData.labels.map(label => label.label)];

const MealFilter = ({ onCategorySelect }) => {
  return (
    <div className="meal-filter">
      {categories.map(category => (
        <button
          key={category}
          className="category-button"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default MealFilter;
