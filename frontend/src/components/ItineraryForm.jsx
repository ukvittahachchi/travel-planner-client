const ItineraryForm = ({ tripData, setTripData }) => {
  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">Destination</label>
      <input
        type="text"
        name="destination"
        value={tripData.destination}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block text-sm font-medium mt-2">Dates</label>
      <input
        type="text"
        name="dates"
        value={tripData.dates}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default ItineraryForm;
