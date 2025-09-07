import React from "react";

const TravelPlan = ({ plan }) => {
  if (!plan) return null;

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Your AI Travel Plan:</h3>
      <pre className="whitespace-pre-wrap">{plan}</pre>
    </div>
  );
};

export default TravelPlan;
