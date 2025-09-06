import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import CostEstimator from "./pages/CostEstimator";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GroupPlanning from "./pages/GroupPlanning";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
        <Route path="/itinerary-builder" element={
                  <ProtectedRoute>
                    <ItineraryBuilder />
                  </ProtectedRoute>
                } />
        <Route path="/cost-estimator/:tripId" element={
                  <ProtectedRoute>
                    <CostEstimator />
                  </ProtectedRoute>
                } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/group-planning/:tripId" element={
                  <ProtectedRoute>
                    <GroupPlanning />
                  </ProtectedRoute>
                } />
      </Routes>
    </Router>
  );
}

export default App;
