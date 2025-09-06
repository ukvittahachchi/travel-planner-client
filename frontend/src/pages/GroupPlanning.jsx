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
  const [memberEmail, setMemberEmail] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setTrips(storedTrips);
    setTrip(storedTrips[tripId] || null);
    
    // Generate shareable link
    const currentUrl = `${window.location.origin}/group-planning/${tripId}`;
    setShareLink(currentUrl);
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

    const memberIdentifier = memberEmail.trim() 
      ? `${memberName.trim()} (${memberEmail.trim()})` 
      : memberName.trim();

    const updatedTrip = {
      ...trip,
      members: [...(trip.members || []), memberIdentifier],
    };

    const updatedTrips = [...trips];
    updatedTrips[tripId] = updatedTrip;

    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    setTrip(updatedTrip);
    setMemberName("");
    setMemberEmail("");
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

  // Copy share link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  // Share via email
  const shareViaEmail = () => {
    const subject = `Join me in planning: ${trip.name}`;
    const body = `Hi! I'd like to invite you to collaborate on planning our trip "${trip.name}". Use this link to join: ${shareLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // ✅ Safely calculate total cost with proper parsing
  const totalFlightCost = Object.values(trip.flights || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );

  const totalHotelCost = Object.values(trip.hotels || {}).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );

  const dailyExpenseValue = parseFloat(trip.dailyExpense) || 0;
  const totalDailyExpense = (trip.destinations?.length || 0) * dailyExpenseValue;

  const totalCost = totalFlightCost + totalHotelCost + totalDailyExpense;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{trip.name} – Group Planning</h2>

      {/* Share Options */}
      <div className="border p-4 rounded shadow-md mb-4 bg-blue-50">
        <h3 className="text-lg font-semibold mb-2">Share Trip</h3>
        
        <button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
        >
          {showShareOptions ? "Hide Share Options" : "Show Share Options"}
        </button>

        {showShareOptions && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="border p-2 rounded flex-1"
                placeholder="Shareable link"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              >
                {copySuccess || "Copy Link"}
              </button>
            </div>
            
            <button
              onClick={shareViaEmail}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Share via Email
            </button>
            
            <p className="text-sm text-gray-600">
              Share this link with friends to collaborate on trip planning and expense splitting.
            </p>
          </div>
        )}
      </div>

      {/* Member Management */}
      <div className="border p-4 rounded shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Group Members</h3>

        <div className="space-y-3 mb-3">
          <input
            type="text"
            placeholder="Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddMember}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Member
          </button>
        </div>

        {/* Show Members */}
        {trip.members && trip.members.length > 0 ? (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Group Members ({trip.members.length})</h4>
            <ul className="space-y-2">
              {trip.members.map((m, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                >
                  <span>{m}</span>
                  <button
                    onClick={() => handleRemoveMember(m)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic">No members added yet.</p>
        )}
      </div>

      {/* Expense Splitter */}
      {trip.members && trip.members.length > 0 && (
        <div className="mt-6">
          <ExpenseSplitter 
            totalCost={totalCost} 
            members={trip.members} 
            onSplitUpdate={(splits) => {
              // Save splits to trip data
              const updatedTrip = { ...trip, expenseSplits: splits };
              const updatedTrips = [...trips];
              updatedTrips[tripId] = updatedTrip;
              localStorage.setItem("trips", JSON.stringify(updatedTrips));
              setTrip(updatedTrip);
            }}
            initialSplits={trip.expenseSplits || {}}
          />
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