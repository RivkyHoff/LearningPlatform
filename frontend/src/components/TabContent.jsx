import React from 'react';
import CoursesAIChat from './CoursesAIChat';

export default function TabContent({ selectedTab, categories, userName }) {
  return (
    <div className="tab-content" style={{ padding: 32 }}>
      {selectedTab === 'About' && (
        <div style={{
          background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
          borderRadius: 16,
          padding: 32,
          color: '#00838f',
          fontSize: 22,
          fontWeight: 500,
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
        }}>
          <h2 style={{ color: '#00838f', fontWeight: 700 }}>About Our Learning Platform</h2>
          <p>
            Welcome to our innovative learning platform!<br />
            Here, you can explore a variety of courses and lectures, all enhanced by our integrated AI chat assistant.<br />
            Get instant help, personalized recommendations, and interactive learning experiences—all in a modern, supportive environment.
          </p>
        </div>
      )}

      {selectedTab === 'Our Courses' && (
        <CoursesAIChat selectedTab={selectedTab} categories={categories} userName={userName} />
      )}
    </div>
  );
}