import express from "express";
import axios from "axios";

const router = express.Router();

// POST /api/ai/travel-plan
router.post("/travel-plan", async (req, res) => {
  try {
    const { tripData } = req.body;

    const prompt = `
Act as an expert AI travel planner. 
Trip: ${tripData.name}
Destinations: ${tripData.destinations?.join(", ")}
Dates: ${tripData.dates || "Not provided"}
Members: ${tripData.members?.join(", ") || "Solo traveler"}
Budget: $${tripData.dailyExpense}/day

Generate a clear, structured travel itinerary with:
- Daily plan
- Flight & hotel suggestions
- Weather expectations
- Cost breakdown
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // Free model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ plan: response.data.choices[0].message.content });
  } catch (error) {
    console.error("AI API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate travel plan" });
  }
});

export default router;
