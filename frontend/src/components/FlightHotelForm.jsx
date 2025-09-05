import React, { useState } from "react";

const FlightHotelForm = ({ destinations }) => {
  const [flights, setFlights] = useState({});
  const [hotels, setHotels] = useState({});

  const handleFlightChange = (dest, value) => {
    setFlights({ ...flights, [dest]: Number(value) });
  };

  const handleHotelChange = (dest, value) => {
    setHotels({ ...hotels, [dest]: Number(value) });
  };

  return (
    <div className="mb-4">
      {destinations.map((dest, i) => (
        <div key={i} className="border p-2 rounded mb-2">
          <h4 className="font-semibold">{dest}</h4>
          <input
            type="number"
            placeholder="Flight Cost"
            value={flights[dest] || ""}
            onChange={(e) => handleFlightChange(dest, e.target.value)}
            className="border p-1 rounded w-full mb-1"
          />
          <input
            type="number"
            placeholder="Hotel Cost"
            value={hotels[dest] || ""}
            onChange={(e) => handleHotelChange(dest, e.target.value)}
            className="border p-1 rounded w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default FlightHotelForm;
