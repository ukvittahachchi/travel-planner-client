import { useState } from "react";
import { getAITravelPlan } from "../services/aiService";
import TravelForm from "../components/TravelForm";
import TravelPlan from "../components/TravelPlan";

const Dashboard = () => {
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGenerate = async (tripData) => {
    setLoading(true);
    const aiPlan = await getAITravelPlan(tripData);
    setPlan(aiPlan);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Trips</h2>

      <div className="grid gap-4 mb-6">
        {trips.map((trip, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{trip.name}</h3>
            <p>{trip.destinations?.join(", ") || "No destinations yet"}</p>
          </div>
        ))}
      </div>

      {/* AI Planner Section */}
      <TravelForm onGenerate={handleGenerate} />
      {loading ? (
        <p className="mt-4 text-gray-600 italic">Generating plan...</p>
      ) : (
        <TravelPlan plan={plan} />
      )}
    </div>
  );
};

export default Dashboard;
