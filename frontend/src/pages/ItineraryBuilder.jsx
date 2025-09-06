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
    dailyExpense: 0,
    members: [],
    expenseSplits: {}, // ✅ Added expense splits
  });

  const [memberInput, setMemberInput] = useState("");
  const [dailyExpenseInput, setDailyExpenseInput] = useState("");

  // ✅ Add a new group member
  const handleAddMember = () => {
    if (memberInput.trim() !== "") {
      const newMember = memberInput.trim();
      setTripData({
        ...tripData,
        members: [...tripData.members, newMember],
        // Initialize expense split for new member
        expenseSplits: {
          ...tripData.expenseSplits,
          [newMember]: 0
        }
      });
      setMemberInput("");
    }
  };

  // ✅ Remove a member
  const handleRemoveMember = (index) => {
    const memberToRemove = tripData.members[index];
    const updatedMembers = [...tripData.members];
    updatedMembers.splice(index, 1);
    
    // Remove from expense splits too
    const updatedSplits = { ...tripData.expenseSplits };
    delete updatedSplits[memberToRemove];
    
    setTripData({ 
      ...tripData, 
      members: updatedMembers,
      expenseSplits: updatedSplits
    });
  };

  // ✅ Update daily expense
  const handleDailyExpenseChange = (e) => {
    const value = e.target.value;
    setDailyExpenseInput(value);
    
    setTripData({
      ...tripData,
      dailyExpense: value === "" ? 0 : parseFloat(value) || 0
    });
  };

  const handleSaveTrip = () => {
    console.log("Saved Trip:", tripData);

    // Save trip in localStorage
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

      {/* Daily Expense Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Daily Expense per Destination ($)</label>
        <input
          type="number"
          placeholder="Enter daily expense estimate"
          value={dailyExpenseInput}
          onChange={handleDailyExpenseChange}
          min="0"
          className="border p-2 w-full rounded"
        />
        <p className="text-sm text-gray-500 mt-1">
          Estimated daily spending for food, activities, etc.
        </p>
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
        setFlights={(newFlights) => setTripData({ ...tripData, flights: newFlights })}
        setHotels={(newHotels) => setTripData({ ...tripData, hotels: newHotels })}
      />

      {/* Group Members Input */}
      <div className="mt-6 border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Group Members</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter member name or email"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddMember}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* List of added members */}
        {tripData.members.length > 0 && (
          <ul className="list-disc pl-5">
            {tripData.members.map((member, index) => (
              <li key={index} className="flex justify-between items-center mb-1">
                <span>{member}</span>
                <button
                  onClick={() => handleRemoveMember(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

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