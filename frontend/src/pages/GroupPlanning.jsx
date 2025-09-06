import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExpenseSplitter from "../components/ExpenseSplitter";

const GroupPlanning = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  // Load trips from localStorage
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState(null);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(storedTrips);
    setTrip(storedTrips[tripId] || null);
  }, [tripId]);

  if (!trip) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Trip not found ❌</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Add a new member
  const handleAddMember = () => {
    if (!memberName.trim()) return;

    const updatedTrip = {
      ...trip,
      members: [...(trip.members || []), memberName.trim()],
    };

    const updatedTrips = [...trips];
    updatedTrips[tripId] = updatedTrip;

    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    setTrip(updatedTrip);
    setMemberName("");
  };

  // Remove a member
  const handleRemoveMember = (name) => {
    const updatedMembers = trip.members.filter((m) => m !== name);
    const updatedTrip = { ...trip, members: updatedMembers };

    const updatedTrips = [...trips];
    updatedTrips[tripId] = updatedTrip;

    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    setTrip(updatedTrip);
  };

  // Calculate total cost
  const totalCost =
    (Object.values(trip.flights || {}).reduce((a, b) => a + b, 0)) +
    (Object.values(trip.hotels || {}).reduce((a, b) => a + b, 0)) +
    ((trip.destinations?.length || 0) * (trip.dailyExpense || 100));

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{trip.name} – Group Planning</h2>

      {/* Member Management */}
      <div className="border p-4 rounded shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Invite Friends</h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter friend's name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleAddMember}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* Show Members */}
        {trip.members && trip.members.length > 0 ? (
          <ul className="space-y-2">
            {trip.members.map((m, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <span>{m}</span>
                <button
                  onClick={() => handleRemoveMember(m)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No members added yet.</p>
        )}
      </div>

      {/* Expense Splitter */}
      {trip.members && trip.members.length > 0 && (
        <div className="mt-6">
          <ExpenseSplitter totalCost={totalCost} members={trip.members} />
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default GroupPlanning;
