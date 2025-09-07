// src/services/api.js
import axios from "axios";

// --- API KEYS ---
const AMADEUS_API_KEY = "ODtyv5fwAyJloSEZjXJYKSc20VolMoRQ";
const OPENWEATHER_API_KEY = "12e3031a73f529bb4c4ea68d4192fdda";
const RAPIDAPI_KEY = "172b4a6605mshdd38a1a34c3e7ddp12a8d2jsnbd31c05a8706";

// ============================
// 1) AMADEUS FLIGHTS API
// ============================
export const fetchFlights = async (origin = "NYC", destination = "LON", departureDate = "2025-09-10") => {
  try {
    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        params: {
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          adults: 1,
          max: 5,
        },
        headers: {
          Authorization: `Bearer ${AMADEUS_API_KEY}`, // For test, replace with real OAuth token if required
        },
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};

// ============================
// 2) BOOKING.COM HOTELS API (RapidAPI)
// ============================
export const fetchHotels = async (cityId = "-1456928", checkin = "2025-09-10", checkout = "2025-09-12") => {
  try {
    const response = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/search",
      {
        params: {
          locale: "en-us",
          order_by: "popularity",
          filter_by_currency: "USD",
          checkin_date: checkin,
          checkout_date: checkout,
          adults_number: "2",
          dest_type: "city",
          dest_id: cityId,
        },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      }
    );
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};

// ============================
// 3) OPENWEATHER WEATHER API
// ============================
export const fetchWeather = async (city = "London") => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          units: "metric",
          appid: OPENWEATHER_API_KEY,
        },
      }
    );
    return response.data || {};
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {};
  }
};
