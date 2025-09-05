const DestinationCard = ({ destination, dates, onViewCost, onManageGroup }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{destination}</h2>
      <p className="text-gray-600">{dates}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onViewCost}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Cost
        </button>
        <button
          onClick={onManageGroup}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Manage Group
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
