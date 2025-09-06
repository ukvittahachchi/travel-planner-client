import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationList from "../components/DestinationList";
import FlightHotelForm from "../components/FlightHotelForm";
import CostSummary from "../components/CostSummary";

const ItineraryBuilder = () => {
  const navigate = useNavigate();

  // Main trip state
  const [tripData, setTripData] = useState({
    name: "",
    destinations: [],
    flights: {},
    hotels: {},
    dailyExpense: 100,
  });

  const handleSaveTrip = () => {
    console.log("Saved Trip:", tripData);

    // Save in localStorage for now
    const existingTrips = JSON.parse(localStorage.getItem("trips")) || [];
    localStorage.setItem("trips", JSON.stringify([...existingTrips, tripData]));

    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Build Your Itinerary</h2>

      {/* Trip Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Trip Name</label>
        <input
          type="text"
          placeholder="Enter trip name"
          value={tripData.name}
          onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Destinations */}
      <DestinationList
        destinations={tripData.destinations || []}
        setDestinations={(newDestinations) =>
          setTripData({ ...tripData, destinations: newDestinations })
        }
      />

      {/* Flights & Hotels */}
      <FlightHotelForm
        destinations={tripData.destinations || []}
        flights={tripData.flights || {}}
        hotels={tripData.hotels || {}}
        setFlights={(newFlights) =>
          setTripData({ ...tripData, flights: newFlights })
        }
        setHotels={(newHotels) =>
          setTripData({ ...tripData, hotels: newHotels })
        }
      />

      {/* Cost Summary */}
      <CostSummary
        destinations={tripData.destinations || []}
        flights={tripData.flights || {}}
        hotels={tripData.hotels || {}}
        dailyExpense={tripData.dailyExpense}
      />

      {/* Save Trip Button */}
      <button
        onClick={handleSaveTrip}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Trip
      </button>
    </div>
  );
};

export default ItineraryBuilder;
