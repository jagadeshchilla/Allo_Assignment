import React, { useState } from "react";
import "./PassengerSelection.css";

const PassengerSelection = ({
  currentPassenger,
  setCurrentPassenger,
  selectedMeals,
  totalPrice,
}) => {
  const passengers = [1, 2]; // Modify this if you have more passengers
  const [expandedPassenger, setExpandedPassenger] = useState(null);

  const handleTogglePassenger = (passenger) => {
    setExpandedPassenger(expandedPassenger === passenger ? null : passenger);
    setCurrentPassenger(passenger);
  };

  return (
    <section className="container">
      <div className="passenger-selection">
        <h2>Select meal</h2>
        <div className="flight-info">
          <p>
            <b>Riga - St Petersburg</b>
          </p>
          <p>Flight duration: 3h 40mins</p>
        </div>
        <div className="passenger-accordion">
          {passengers.map((passenger) => (
            <div key={passenger} className="passenger">
              <div
                className="passenger-header"
                onClick={() => handleTogglePassenger(passenger)}
              >
                <p>Adult passenger {passenger}</p>
                <span>{expandedPassenger === passenger ? "-" : "+"}</span>
              </div>
              {expandedPassenger === passenger && (
                <div className="passenger-content">
                  <p>
                    {selectedMeals[passenger]
                      ? "Select meal"
                      : "Not selected"}
                  </p>
                  <ul>
                    {selectedMeals[passenger] ? (
                      selectedMeals[passenger].map((meal) => (
                        <li key={meal.id}>
                          {meal.title} - {meal.price}${" "}
                          {meal.drink ? `(Drink: ${meal.drink})` : ""}
                        </li>
                      ))
                    ) : (
                      <li>No meals selected</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="total-price">Total for all passengers: {totalPrice}$</p>
      </div>
    </section>
  );
};

export default PassengerSelection;
