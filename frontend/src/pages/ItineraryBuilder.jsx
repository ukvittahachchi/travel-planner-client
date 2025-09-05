import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import ItineraryForm from "../components/ItineraryForm";
import DestinationList from "../components/DestinationList";
import FlightHotelForm from "../components/FlightHotelForm";
import CostSummary from "../components/CostSummary"; // optional

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const { trips, setTrips } = useContext(UserContext);

  const [tripData, setTripData] = useState({
    destination: "",
    dates: "",
    flights: [],
    hotels: [],
    expenses: [],
  });

  const handleSaveTrip = () => {
    if (!tripData.destination || !tripData.dates) {
      alert("Please fill in the destination and dates.");
      return;
    }

    const newTrip = {
      id: trips.length + 1,
      ...tripData,
    };

    setTrips([...trips, newTrip]);
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Build Your Trip</h1>

      <ItineraryForm tripData={tripData} setTripData={setTripData} />
      <DestinationList tripData={tripData} setTripData={setTripData} />
      <FlightHotelForm tripData={tripData} setTripData={setTripData} />

      <CostSummary tripData={tripData} /> {/* Optional */}

      <button
        onClick={handleSaveTrip}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Trip
      </button>
    </div>
  );
};

export default ItineraryBuilder;
