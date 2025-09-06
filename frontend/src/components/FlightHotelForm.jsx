import React from "react";

const FlightHotelForm = ({ destinations = [], flights = {}, hotels = {}, setFlights, setHotels }) => {
  return (
    <div className="mb-4">
      {destinations.map((dest, i) => {
        const flight = flights?.[dest] || { airline: "", price: 0 };
        const hotel = hotels?.[dest] || { name: "", price: 0 };

        return (
          <div key={i} className="border p-3 rounded mb-3 shadow-sm">
            <h4 className="font-semibold mb-2">{dest}</h4>

            {/* ✈️ Flight Inputs */}
            <input
              type="text"
              placeholder="Airline"
              value={flight.airline}
              onChange={(e) =>
                setFlights({ ...flights, [dest]: { ...flight, airline: e.target.value } })
              }
              className="border p-2 w-full rounded mb-2"
            />

            <input
              type="number"
              placeholder="Flight Price"
              value={flight.price || ""}
              onChange={(e) =>
                setFlights({ ...flights, [dest]: { ...flight, price: Number(e.target.value) } })
              }
              className="border p-2 w-full rounded mb-2"
            />

            {/* 🏨 Hotel Inputs */}
            <input
              type="text"
              placeholder="Hotel Name"
              value={hotel.name}
              onChange={(e) =>
                setHotels({ ...hotels, [dest]: { ...hotel, name: e.target.value } })
              }
              className="border p-2 w-full rounded mb-2"
            />

            <input
              type="number"
              placeholder="Hotel Price"
              value={hotel.price || ""}
              onChange={(e) =>
                setHotels({ ...hotels, [dest]: { ...hotel, price: Number(e.target.value) } })
              }
              className="border p-2 w-full rounded"
            />
          </div>
        );
      })}
    </div>
  );
};

export default FlightHotelForm;
