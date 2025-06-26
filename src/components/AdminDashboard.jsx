import React, { useEffect, useState } from 'react';
import { getAllUserHistories } from '../services/historyService';

export default function AdminDashboard() {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllUserHistories()
      .then(data => setHistories(data.$values || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading all user histories...</div>;
  if (!histories.length) return <div>No user prompt histories found.</div>;

  return (
    <div>
      <h2>Admin Dashboard: All User Prompt Histories</h2>
      {histories.map(user => (
        <div key={user.userId || user.id} style={{ marginBottom: 24, borderBottom: '1px solid #ccc' }}>
          <h4>User: {user.userName || user.name}</h4>
          <ul>
            {(user.histories || user.prompts || user.responses || []).map((item, i) => (
              <li key={item.id || item.promptId || i}>
                <strong>Prompt:</strong> {item.promptText || item.prompt_a} <br />
                <strong>Response:</strong> {item.responseText || item.response}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}