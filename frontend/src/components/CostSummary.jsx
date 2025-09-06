import React, { useEffect, useState } from "react";

const CostSummary = ({ destinations = [], flights = {}, hotels = {}, dailyExpense = 100 }) => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Extract just the price values from flight objects
    const flightSum = Object.values(flights).reduce((sum, flight) => {
      return sum + (flight?.price || 0);
    }, 0);
    
    // Extract just the price values from hotel objects
    const hotelSum = Object.values(hotels).reduce((sum, hotel) => {
      return sum + (hotel?.price || 0);
    }, 0);
    
    const dailySum = (destinations?.length || 0) * dailyExpense;
    setTotalCost(flightSum + hotelSum + dailySum);
  }, [destinations, flights, hotels, dailyExpense]);

  return (
    <div className="border p-4 rounded shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-2">Cost Summary</h3>
      <p>
        Total Estimated Cost: <span className="font-bold">${totalCost}</span>
      </p>
    </div>
  );
};

export default CostSummary;