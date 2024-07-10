import React, { useState, useEffect } from 'react';
import './MealCard.css';

// Importing drink images
import beerImage from '../data/beer.jpg';
import wineImage from '../data/vine.jpg';
import juiceImage from '../data/juice.jpg';

const drinkImages = {
  Beer: beerImage,
  Wine: wineImage,
  Juice: juiceImage,
};

const drinkPrices = {
  Beer: 2.5,
  Wine: 3.0,
  Juice: 1.5,
};

const MealCard = ({ meal, onSelect, onDeselect, selected }) => {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [totalPrice, setTotalPrice] = useState(meal.price);

  useEffect(() => {
    if (selectedDrink) {
      setTotalPrice((meal.price + drinkPrices[selectedDrink]).toFixed(2));
    } else {
      setTotalPrice(meal.price.toFixed(2));
    }
  }, [selectedDrink, meal.price]);

  const handleSelectDrink = (drink) => {
    if (selected) {
      alert('First deselect the meal and try again.');
    } else {
      setSelectedDrink(drink);
    }
  };
  console.log(meal);

  return (
    <div className="meal-card">
      <img src={meal.img} alt={meal.name} className="meal-image" />
      <div className="meal-info">
        <h2>{meal.title}</h2>
        <p>Starter: {meal.starter}</p>
        <p>Dessert: {meal.desert}</p>
        <p>Price: ${totalPrice}</p>
        <p>Selected drink: {selectedDrink || 'none'}</p>
        <div className="drink-selection">
          {Object.keys(drinkImages).map(drink => (
            <img
              key={drink}
              src={drinkImages[drink]}
              alt={drink}
              className={`drink-image ${selectedDrink === drink ? 'selected' : ''}`}
              onClick={() => handleSelectDrink(drink)}
            />
          ))}
        </div>
        
      </div>
      <div className="meal-actions">
          {selected ? (
            <button onClick={() => onDeselect(meal)}>Deselect</button>
          ) : (
            <button onClick={() => onSelect(meal, selectedDrink, drinkPrices[selectedDrink])}>Select</button>
          )}
        </div>
    </div>
  );
};

export default MealCard;
