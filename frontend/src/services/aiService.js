// src/services/aiService.js
export const getAITravelPlan = async (tripData) => {
  try {
    const response = await fetch("http://localhost:5000/api/ai/travel-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (!response.ok) throw new Error("Failed to fetch travel plan");

    const data = await response.json();
    return data.plan; // plan returned from backend
  } catch (error) {
    console.error("AI API Error:", error);
    return null;
  }
};
