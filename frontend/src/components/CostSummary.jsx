import React, { useEffect, useState } from "react";

const CostSummary = ({ destinations, flights, hotels, dailyExpense = 100 }) => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let flightSum = Object.values(flights || {}).reduce((a, b) => a + (b || 0), 0);
    let hotelSum = Object.values(hotels || {}).reduce((a, b) => a + (b || 0), 0);
    let dailySum = destinations.length * dailyExpense;
    setTotalCost(flightSum + hotelSum + dailySum);
  }, [destinations, flights, hotels, dailyExpense]);

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Cost Summary</h3>
      <p>Total Estimated Cost: <span className="font-bold">${totalCost}</span></p>
    </div>
  );
};

export default CostSummary;
