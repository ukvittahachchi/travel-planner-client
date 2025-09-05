import React, { useState, useEffect } from "react";

const ExpenseSplitter = ({ totalCost, members }) => {
  const [split, setSplit] = useState(0);

  useEffect(() => {
    if (members && members.length > 0) {
      setSplit(totalCost / members.length);
    }
  }, [totalCost, members]);

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Expense Split</h3>
      {members.map((m, i) => (
        <p key={i}>{m}: ${split.toFixed(2)}</p>
      ))}
    </div>
  );
};

export default ExpenseSplitter;
