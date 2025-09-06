import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CostSummary from "../components/CostSummary";
import ExpenseSplitter from "../components/ExpenseSplitter";

const CostEstimator = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    const foundTrip = trips[tripId];
    if (foundTrip) {
      setTrip(foundTrip);
    } else {
      navigate("/dashboard"); // redirect if trip not found
    }
  }, [tripId, navigate]);

  if (!trip) return <p className="p-4">Loading trip...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Cost Estimator: {trip.name}
      </h2>

      {/* Cost Breakdown */}
      <CostSummary
        destinations={trip.destinations || []}
        flights={trip.flights || {}}
        hotels={trip.hotels || {}}
        dailyExpense={trip.dailyExpense}
      />

      {/* Expense Splitter (if group trip) */}
      {trip.group && trip.group.length > 1 && (
        <div className="mt-6">
          <ExpenseSplitter
            totalCost={
              Object.values(trip.flights || {}).reduce(
                (sum, f) => sum + (f.price || 0),
                0
              ) +
              Object.values(trip.hotels || {}).reduce(
                (sum, h) => sum + (h.price || 0),
                0
              ) +
              (trip.destinations?.length || 0) * (trip.dailyExpense || 0)
            }
            members={trip.group}
          />
        </div>
      )}

      {/* Back to Dashboard */}
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
