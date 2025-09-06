import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const trips = JSON.parse(localStorage.getItem("trips")) || [];

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
        {trips.map((trip, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{trip.name}</h3>
            <p>{trip.destinations?.join(", ") || "No destinations yet"}</p>

            <div className="flex gap-2 mt-2">
              {/* ✅ Navigate to cost estimator */}
              <button
                onClick={() => navigate(`/cost-estimator/${index}`)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                View Cost
              </button>

              {/* (Optional) Navigate to group planning */}
              <button
                onClick={() => navigate(`/group-planning/${index}`)}
                className="bg-purple-500 text-white px-3 py-1 rounded"
              >
                Manage Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
