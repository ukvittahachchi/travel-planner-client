import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // or wherever you store trips
import DestinationCard from "../components/DestinationCard"; // for trip preview

const Dashboard = () => {
  const { trips } = useContext(UserContext); // Trips stored in context or mock
  const navigate = useNavigate();

  const handleNewTrip = () => {
    navigate("/itinerary-builder");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Trips</h1>

      <button
        onClick={handleNewTrip}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Create New Trip
      </button>

      {trips && trips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trips.map((trip) => (
            <DestinationCard
              key={trip.id}
              destination={trip.destination}
              dates={trip.dates}
              onViewCost={() => navigate(`/cost-estimator/${trip.id}`)}
              onManageGroup={() => navigate(`/group-planning/${trip.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No trips yet. Start by creating one!</p>
      )}
    </div>
  );
};

export default Dashboard;
