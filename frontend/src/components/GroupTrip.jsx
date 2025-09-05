import React, { useState } from "react";

const GroupTrip = () => {
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");

  const addEmail = () => {
    if (newEmail) {
      setEmails([...emails, newEmail]);
      setNewEmail("");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Group Planning</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={addEmail} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
      <ul className="mb-2">
        {emails.map((email, i) => <li key={i}>{email}</li>)}
      </ul>
      <p>Share this trip via a unique link (mock)</p>
    </div>
  );
};

export default GroupTrip;
