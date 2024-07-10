import React, { useState } from "react";
import MealFilter from "../components/MealFilter";
import MealCard from "../components/MealCard";
import PassengerSelection from "../components/PassengerSelection";
import Pagination from "../components/Pagination";
import mealsData from "../data/meals.json";
import "./Main.css";

function Main() {
  const [meals, setMeals] = useState(mealsData.meals); // Ensure mealsData.meals is the correct structure
  const [selectedMeals, setSelectedMeals] = useState({});
  const [currentPassenger, setCurrentPassenger] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 3;

  const handleSelectMeal = (meal, drink, drinkPrice) => {
    setSelectedMeals((prevSelectedMeals) => {
      const passengerMeals = prevSelectedMeals[currentPassenger] || [];
      return {
        ...prevSelectedMeals,
        [currentPassenger]: [...passengerMeals, { ...meal, drink, drinkPrice }],
      };
    });
  };

  const handleDeselectMeal = (meal) => {
    setSelectedMeals((prevSelectedMeals) => {
      const passengerMeals = prevSelectedMeals[currentPassenger] || [];
      return {
        ...prevSelectedMeals,
        [currentPassenger]: passengerMeals.filter((m) => m.id !== meal.id),
      };
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredMeals =
    selectedCategory === "All"
      ? meals
      : meals.filter((meal) => {
          return (
            meal.labels &&
            meal.labels.some(
              (label) => label === selectedCategory.toLowerCase()
            )
          );
        });

  const calculateTotalPrice = () => {
    return Object.values(selectedMeals)
      .flat()
      .reduce((total, meal) => {
        return total + (meal.price + (meal.drinkPrice || 0));
      }, 0)
      .toFixed(2);
  };

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  return (
    <section className="App">
      <div className="App-container">
        <div className="content">
          <div className="card">
            <div className="filter">
              <MealFilter onCategorySelect={handleCategorySelect} />
            </div>
            <div className="meal-list">
              {currentMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onSelect={handleSelectMeal}
                  onDeselect={handleDeselectMeal}
                  selected={selectedMeals[currentPassenger]?.some(
                    (m) => m.id === meal.id
                  )}
                />
              ))}
            </div>
            <div className="page">
              <Pagination
                mealsPerPage={mealsPerPage}
                totalMeals={filteredMeals.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>

          <PassengerSelection
            currentPassenger={currentPassenger}
            setCurrentPassenger={setCurrentPassenger}
            selectedMeals={selectedMeals}
            totalPrice={calculateTotalPrice()}
          />
        </div>
      </div>
    </section>
  );
}

export default Main;
