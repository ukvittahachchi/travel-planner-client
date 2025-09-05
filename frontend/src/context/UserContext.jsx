import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info
  const [trips, setTrips] = useState([]); // Store user's itineraries

  return (
    <UserContext.Provider value={{ user, setUser, trips, setTrips }}>
      {children}
    </UserContext.Provider>
  );
};
