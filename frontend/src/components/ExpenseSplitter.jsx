import React, { useState, useEffect } from "react";

const ExpenseSplitter = ({ totalCost = 0, members = [] }) => {
  const [split, setSplit] = useState(0);

  useEffect(() => {
    // ✅ Ensure totalCost is numeric and members exist
    if (members && members.length > 0 && !isNaN(totalCost)) {
      setSplit(parseFloat(totalCost) / members.length);
    } else {
      setSplit(0);
    }
  }, [totalCost, members]);

  // ✅ Format currency nicely
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount || 0);

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-3">Expense Split</h3>

      {/* Show total cost */}
      <p className="mb-3 text-gray-700">
        Total Trip Cost:{" "}
        <span className="font-bold text-green-600">
          {formatCurrency(totalCost)}
        </span>
      </p>

      {/* Handle empty group */}
      {(!members || members.length === 0) ? (
        <p className="text-gray-500 italic">No group members added yet.</p>
      ) : (
        <div className="space-y-1">
          {members.map((member, index) => (
            <p key={index} className="flex justify-between">
              <span>{member}</span>
              <span className="font-semibold">{formatCurrency(split)}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseSplitter;
