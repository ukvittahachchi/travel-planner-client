import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState(JSON.parse(localStorage.getItem("trips")) || []);
  const [showConfirm, setShowConfirm] = useState(null);

  // Function to delete a trip
  const deleteTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    setShowConfirm(null);
  };

  // Function to handle delete click (with confirmation)
  const handleDeleteClick = (index) => {
    if (showConfirm === index) {
      deleteTrip(index);
    } else {
      setShowConfirm(index);
      // Auto-cancel confirmation after 5 seconds
      setTimeout(() => setShowConfirm(null), 5000);
    }
  };

  // Function to cancel delete
  const cancelDelete = () => {
    setShowConfirm(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Trips</h2>

      <button
        onClick={() => navigate("/itinerary-builder")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create New Trip
      </button>

      <div className="grid gap-4">
        {trips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No trips yet. Create your first trip!</p>
          </div>
        ) : (
          trips.map((trip, index) => (
            <div key={index} className="border p-4 rounded shadow relative">
              <h3 className="text-xl font-semibold">{trip.name}</h3>
              <p>{trip.destinations?.join(", ") || "No destinations yet"}</p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {/* View Cost Button */}
                <button
                  onClick={() => navigate(`/cost-estimator/${index}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View Cost
                </button>

                {/* Manage Group Button */}
                <button
                  onClick={() => navigate(`/group-planning/${index}`)}
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  Manage Group
                </button>

                {/* Delete Button */}
                {showConfirm === index ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-red-600 text-sm font-medium">Confirm delete?</span>
                    <button
                      onClick={() => deleteTrip(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Trip info summary */}
              <div className="mt-2 text-sm text-gray-500">
                {trip.members && trip.members.length > 0 && (
                  <p>Group: {trip.members.length} members</p>
                )}
                {trip.destinations && (
                  <p>Destinations: {trip.destinations.length}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;