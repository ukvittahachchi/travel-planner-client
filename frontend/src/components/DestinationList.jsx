import React, { useState } from "react";

const DestinationList = ({ destinations, setDestinations }) => {
  const [newDest, setNewDest] = useState("");

  const addDestination = () => {
    if (!newDest) return;
    setDestinations([...destinations, newDest]);
    setNewDest("");
  };

  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Destinations:</h3>
      <ul>
        {destinations.map((dest, i) => (
          <li key={i} className="flex justify-between mb-1">
            {dest}
            <button onClick={() => removeDestination(i)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add Destination"
          value={newDest}
          onChange={(e) => setNewDest(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <button onClick={addDestination} className="bg-green-500 text-white p-1 rounded">Add</button>
      </div>
    </div>
  );
};

export default DestinationList;
