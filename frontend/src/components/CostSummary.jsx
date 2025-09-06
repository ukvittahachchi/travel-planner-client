import React, { useEffect, useState } from "react";

const CostSummary = ({ destinations = [], flights = {}, hotels = {}, dailyExpense = 0 }) => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // ✅ Safely calculate total flights cost
    const flightSum = Object.values(flights).reduce((sum, flight) => {
      // If flight is an object with price, use it; otherwise parse the value directly
      const cost = typeof flight === "object" ? parseFloat(flight?.price) || 0 : parseFloat(flight) || 0;
      return sum + cost;
    }, 0);

    // ✅ Safely calculate total hotels cost
    const hotelSum = Object.values(hotels).reduce((sum, hotel) => {
      const cost = typeof hotel === "object" ? parseFloat(hotel?.price) || 0 : parseFloat(hotel) || 0;
      return sum + cost;
    }, 0);

    // ✅ Calculate daily expenses - use 0 as default instead of 100
    const dailySum = (destinations?.length || 0) * (parseFloat(dailyExpense) || 0);

    // ✅ Update total cost
    setTotalCost(flightSum + hotelSum + dailySum);
  }, [destinations, flights, hotels, dailyExpense]);

  // ✅ Format cost as currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="border p-4 rounded shadow-md mt-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">Cost Summary</h3>

      <div className="space-y-1 text-gray-700">
        <p>Flights: <span className="font-bold">{formatCurrency(
          Object.values(flights).reduce((sum, flight) => {
            return sum + (typeof flight === "object" ? parseFloat(flight?.price) || 0 : parseFloat(flight) || 0);
          }, 0)
        )}</span></p>

        <p>Hotels: <span className="font-bold">{formatCurrency(
          Object.values(hotels).reduce((sum, hotel) => {
            return sum + (typeof hotel === "object" ? parseFloat(hotel?.price) || 0 : parseFloat(hotel) || 0);
          }, 0)
        )}</span></p>

        <p>Daily Expenses: <span className="font-bold">{formatCurrency(
          (destinations?.length || 0) * (parseFloat(dailyExpense) || 0)
        )}</span></p>

        <hr className="my-2" />

        <p className="text-lg font-semibold">
          Total Estimated Cost: <span className="text-green-600">{formatCurrency(totalCost)}</span>
        </p>
      </div>
    </div>
  );
};

export default CostSummary;