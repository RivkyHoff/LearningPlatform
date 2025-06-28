import React, { useEffect, useState } from 'react';
import { getUserHistory } from '../services/historyService';

export default function UserHistory({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getUserHistory(userId)
      .then(data => setHistory(data.$values || []))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading your learning history...</div>;
  if (!history.length) return <div>No learning history found.</div>;

  return (
    <div>
      <h3>Your Learning History</h3>
      <ul>
        {history.map(item => (
          <li key={item.id || item.promptId}>
            <strong>Prompt:</strong> {item.promptText || item.prompt_a} <br />
            <strong>Response:</strong> {item.responseText || item.response}
          </li>
        ))}
      </ul>
    </div>
  );
}