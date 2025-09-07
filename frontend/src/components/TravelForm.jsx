import React, { useState } from "react";

const TravelForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    destination: "",
    days: 3,
    budget: "medium",
    interests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData); // send data to parent (Dashboard)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">AI Travel Planner</h3>

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        className="border w-full p-2 rounded"
        required
      />
      <input
        type="number"
        name="days"
        placeholder="Number of Days"
        value={formData.days}
        onChange={handleChange}
        className="border w-full p-2 rounded"
        required
      />
      <select
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="luxury">Luxury</option>
      </select>
      <textarea
        name="interests"
        placeholder="Your Interests (beaches, history, food, etc.)"
        value={formData.interests}
        onChange={handleChange}
        className="border w-full p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Plan
      </button>
    </form>
  );
};

export default TravelForm;
