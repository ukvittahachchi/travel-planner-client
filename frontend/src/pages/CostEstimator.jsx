import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CostSummary from "../components/CostSummary";
import ExpenseSplitter from "../components/ExpenseSplitter";

const CostEstimator = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // Get trips from localStorage
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  const trip = trips[tripId]; // find trip by index

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Trip not found ❌</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ✅ Safely calculate total cost
  const totalFlightCost = Object.values(trip.flights || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );

  const totalHotelCost = Object.values(trip.hotels || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );

  const totalDailyExpense =
    (trip.destinations?.length || 0) * (parseFloat(trip.dailyExpense) || 100);

  const totalCost = totalFlightCost + totalHotelCost + totalDailyExpense;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{trip.name} – Cost Estimator</h2>

      {/* Cost Breakdown */}
      <CostSummary
        destinations={trip.destinations || []}
        flights={trip.flights || {}}
        hotels={trip.hotels || {}}
        dailyExpense={trip.dailyExpense || 100}
      />

      {/* Expense Splitter if group trip */}
      {trip.members && trip.members.length > 0 && (
        <div className="mt-6">
          <ExpenseSplitter totalCost={totalCost} members={trip.members} />
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default CostEstimator;
