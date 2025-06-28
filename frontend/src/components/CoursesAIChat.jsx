import React, { useState, useEffect } from 'react';

export default function CoursesAIChat({ categories, userId }) {
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  function uniqueById(arr) {
    const seen = new Set();
    return arr.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }
 useEffect(() => {
  async function fetchAndGroup() {
    const res = await fetch('https://localhost:7099/api/SubCategory/GetAllSubCategories');
    const data = await res.json();
    const subCategories = data.$values || [];
    const grouped = categories.map(cat => ({
      ...cat,
      subCategories: uniqueById(
        subCategories
          .filter(sub => sub.categoryId === cat.id)
          .reverse()
      ).reverse()
    }));
    setGroupedCategories(grouped);
  }
  fetchAndGroup();
}, [categories]);
    const handleAskAI = async () => {
    setLoading(true);
    setAiResponse('');
    try {
      const response = await fetch('https://localhost:7099/api/Prompt/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          categoryId: selectedCourse.id,
          subCategoryId: selectedSubCategory ? selectedSubCategory.id : 0,
          prompt_a: aiQuestion,
        }),
      });
      const data = await response.json();
      setAiResponse(data.response || 'No response from AI.');
    } catch (err) {
      setAiResponse('Error contacting AI.');
    }
    setLoading(false);
  };

  if (!groupedCategories || groupedCategories.length === 0) {
    return <div style={{ color: '#00838f', textAlign: 'center', marginTop: 32 }}>No courses available.</div>;
  }

  return (
    <div>
      {!selectedCourse ? (
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 24 }}>
          {groupedCategories.map(cat => (
            <div
              key={cat.id}
              style={{
                background: '#e0f7fa',
                borderRadius: 12,
                padding: 24,
                minWidth: 180,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedCourse(cat)}
            >
              <h3 style={{ color: '#00838f', marginBottom: 8 }}>{cat.name}</h3>
              <div style={{ color: '#555', fontSize: 15 }}>Ask the AI teacher for a class of your level!</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#e0f7fa',
          borderRadius: 16,
          padding: 32,
          maxWidth: 500,
          margin: '32px auto',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
        }}>
          <h2 style={{ color: '#00838f', fontWeight: 700, marginBottom: 16 }}>
            {selectedCourse.name} - AI Teacher
          </h2>
             {selectedCourse.subCategories && selectedCourse.subCategories.length > 0 && (
  <>
    <div style={{ marginBottom: 16 }}>
      <select
        value={selectedSubCategory ? selectedSubCategory.id : ''}
        onChange={e => {
          const sub = selectedCourse.subCategories.find(s => s.id === Number(e.target.value));
          setSelectedSubCategory(sub);
        }}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid #b2ebf2',
          fontSize: 16,
          marginBottom: 8,
        }}
      >
        <option value="">Select subcategory...</option>
        {selectedCourse.subCategories.map(sub => (
          <option key={sub.id} value={sub.id}>{sub.name}</option>
        ))}
      </select>
    </div>
  </>
)}
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Ask the AI teacher for a class of your level..."
              value={aiQuestion}
              onChange={e => setAiQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: '1px solid #b2ebf2',
                fontSize: 16,
              }}
              disabled={loading}
            />
            <button
              onClick={handleAskAI}
              style={{
                marginTop: 12,
                background: '#00838f',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontSize: 16,
                cursor: 'pointer',
              }}
              disabled={loading || !aiQuestion.trim()}
            >
              {loading ? 'Asking...' : 'Ask AI'}
            </button>
          </div>
          {aiResponse && (
            <div style={{
              background: '#fff',
              borderRadius: 8,
              padding: 16,
              color: '#00838f',
              fontSize: 17,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }}>
              <strong>AI:</strong> {aiResponse}
            </div>
          )}
          <button
            onClick={() => setSelectedCourse(null)}
            style={{
              marginTop: 24,
              background: 'none',
              color: '#00838f',
              border: '1px solid #00838f',
              borderRadius: 8,
              padding: '8px 18px',
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Back to Courses
          </button>
        </div>
      )}
    </div>
  );
}