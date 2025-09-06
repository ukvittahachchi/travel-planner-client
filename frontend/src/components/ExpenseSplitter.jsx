import React, { useState, useEffect } from "react";

const ExpenseSplitter = ({ totalCost, members, onSplitUpdate, initialSplits = {} }) => {
  const [splits, setSplits] = useState({});
  const [customMode, setCustomMode] = useState(false);

  // Initialize splits when members, totalCost, or initialSplits changes
  useEffect(() => {
    if (members && members.length > 0) {
      const equalSplit = totalCost / members.length;
      const newSplits = {};
      
      members.forEach(member => {
        // Use initial split if available, otherwise use equal split
        newSplits[member] = initialSplits[member] || equalSplit;
      });
      
      setSplits(newSplits);
      
      // Notify parent component of the initial split
      if (onSplitUpdate) {
        onSplitUpdate(newSplits);
      }
    }
  }, [totalCost, members, initialSplits]);

  // Handle custom split changes
  const handleSplitChange = (member, value) => {
    const newValue = parseFloat(value) || 0;
    const newSplits = { ...splits, [member]: newValue };
    
    setSplits(newSplits);
    
    // Notify parent component of the change
    if (onSplitUpdate) {
      onSplitUpdate(newSplits);
    }
  };

  // Reset to equal split
  const resetToEqualSplit = () => {
    const equalSplit = totalCost / members.length;
    const equalSplits = {};
    
    members.forEach(member => {
      equalSplits[member] = equalSplit;
    });
    
    setSplits(equalSplits);
    setCustomMode(false);
    
    // Notify parent component
    if (onSplitUpdate) {
      onSplitUpdate(equalSplits);
    }
  };

  // Calculate total of custom splits
  const customTotal = Object.values(splits).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  const isTotalMatching = Math.abs(customTotal - totalCost) < 0.01;

  return (
    <div className="border p-4 rounded shadow-md mt-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">Expense Split</h3>
      
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setCustomMode(!customMode)}
          className={`px-3 py-1 rounded text-sm ${
            customMode ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {customMode ? 'Equal Split' : 'Custom Split'}
        </button>
        
        {customMode && (
          <button
            onClick={resetToEqualSplit}
            className="px-3 py-1 rounded text-sm bg-green-500 text-white"
          >
            Reset to Equal
          </button>
        )}
      </div>

      {!customMode ? (
        // Equal split mode
        <div className="space-y-2">
          {members.map((member, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">{member}:</span>
              <span className="font-bold">${(totalCost / members.length).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-2 border-t mt-2">
            <strong>Total: ${totalCost.toFixed(2)}</strong>
          </div>
        </div>
      ) : (
        // Custom split mode
        <div className="space-y-3">
          {members.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="font-medium w-1/3">{member}:</label>
              <div className="flex items-center w-2/3">
                <span className="mr-2">$</span>
                <input
                  type="number"
                  value={splits[member]?.toFixed(2) || "0.00"}
                  onChange={(e) => handleSplitChange(member, e.target.value)}
                  min="0"
                  step="0.01"
                  className="border p-1 rounded w-full"
                />
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t mt-2">
            <div className="flex justify-between">
              <span>Custom Total:</span>
              <span className={isTotalMatching ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                ${customTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Actual Total:</span>
              <span className="font-bold">${totalCost.toFixed(2)}</span>
            </div>
            
            {!isTotalMatching && (
              <div className="text-red-500 text-sm mt-1">
                Warning: Custom splits don't match the total cost!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSplitter;