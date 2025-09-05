import React from "react";
import DestinationCard from "./DestinationCard";

const mockDestinations = [
  { id: 1, name: "Paris", description: "City of lights", avgCost: 1500 },
  { id: 2, name: "Tokyo", description: "Land of the rising sun", avgCost: 2000 },
  { id: 3, name: "Rome", description: "Ancient history", avgCost: 1300 },
];

const DestinationSuggestions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {mockDestinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  );
};

export default DestinationSuggestions;
