const ItineraryForm = ({ tripData, setTripData }) => {
  return (
    <div className="mb-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Trip Details</h2>
      <input
        type="text"
        placeholder="Destination"
        className="block w-full p-2 mb-2 border rounded"
        value={tripData.destination}
        onChange={(e) =>
          setTripData({ ...tripData, destination: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Dates (e.g., 12-18 Sep 2025)"
        className="block w-full p-2 mb-2 border rounded"
        value={tripData.dates}
        onChange={(e) => setTripData({ ...tripData, dates: e.target.value })}
      />
    </div>
  );
};

export default ItineraryForm;
