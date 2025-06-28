import React, { useEffect, useState } from 'react';
import { getUsers, getAdminUsers } from './api';
import './App.css';
import { registerUser } from './services/registerService';
import SignInModal from './modal/SignInModal';
import TabContent from './components/TabContent';
import CoursesAIChat from './components/CoursesAIChat';
import UserHistory from './components/UserHistory';
import AdminDashboard from './components/AdminDashboard';


const tabs = ['About', 'Our Courses', 'History', 'Admin Dashboard','Contact Us'];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState('About');
  const [categories, setCategories] = useState([]);
  const [registerData, setRegisterData] = useState({
    id: '',
    name: '',
    phone: '',
  });
  const [registerStatus, setRegisterStatus] = useState('');
  // const [userName, setUserName] = useState('');

  useEffect(() => {
    getUsers({ Id: 2, Name: 'MALKAH', Phone: '5819073' })
      .then(response => {
        console.log('User exists:', response.data);
      })
      .catch(error => {
        console.error('User exists error:', error);
      });

    getAdminUsers()
      .then(response => {
        console.log('Admin Users:', response.data);
      })
      .catch(error => {
          console.error('Admin Users error:', error);
      });
  }, []);
    useEffect(() => {
    if (selectedTab === 'Our Courses') {
      fetch('https://localhost:7099/api/Category')
        .then(res => res.json())
        .then(data => setCategories(data.$values || []))
        .catch(() => setCategories([]));
    }
  }, [selectedTab]);

const handleRegister = (e) => {
  e.preventDefault();
  registerUser(registerData, setRegisterStatus, setShowRegister);
};

  return (
    <div className="app-root">
     
      <div className="top-nav">
       
       <div className="tabs">
        {tabs.map(tab => (
          // <div
          //   className={`tab${selectedTab === tab ? ' active' : ''}`}
          //   key={tab}
          //   onClick={() => setSelectedTab(tab)}
          //   style={{
          //     cursor: 'pointer',
          //     padding: '10px 20px',
          //     borderBottom: selectedTab === tab ? '3px solid #00838f' : 'none',
          //     color: selectedTab === tab ? '#00838f' : '#333',
          //     fontWeight: selectedTab === tab ? 700 : 400,
          //     background: selectedTab === tab ? '#e0f7fa' : 'transparent'
          //   }}
          // >
          //     {tab}
          //   </div>
          <div
              className={`tab${selectedTab === tab ? ' active' : ''}`}
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>        
        <div className="right-buttons">
          {/* {userName && (
            <span style={{
              color: '#00838f',
              fontWeight: 700,
              marginRight: 16,
              fontSize: 18
            }}>
              {userName}
            </span>
          )} */}
          {currentUser && (
              <span style={{
                color: '#00838f',
                fontWeight: 700,
                marginRight: 16,
                fontSize: 18
              }}>
                {currentUser.name}
              </span>
            )}
          <button
            className="nav-btn"
            onClick={() => setShowRegister(true)}
            style={{ fontSize: 16 }}
          >
            Register
          </button>
          <button
            className="nav-btn"
            onClick={() => setShowSignIn(true)}
            style={{ fontSize: 16 }}
          >
            Sign In
          </button>
        </div>
      </div>
            {selectedTab === 'Our Courses' ? (
                currentUser ? (
                  <CoursesAIChat categories={categories} userId={currentUser.id} />
                ) : (
                  <SignInModal onSignIn={user => setCurrentUser(user)} />
                )
              ) : selectedTab === 'History' ? (
                currentUser ? (
                  <UserHistory userId={currentUser.id} />
                ) : (
                  <div>Please sign in to view your learning history.</div>
                )
              ) : selectedTab === 'Admin Dashboard' ? (
                <AdminDashboard />
              ) : (
                <TabContent selectedTab={selectedTab} categories={categories} />
              )}
      <div className="flex-1"></div>

      <div className="bottom-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ marginLeft: 0, fontSize: 14 }}>
          Copyright © 2025 AILearning Ltd
        </div>
        <form
          className="contact-form"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 10,
            alignItems: 'center'
          }}
        >
          <span>Any question?</span>
          <input type="text" placeholder="Request" />
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <button type="submit">Send</button>
        </form>
      </div>
   
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Register</h2>
             <form onSubmit={handleRegister} className="register-form">
            <input
              type="text"
              placeholder="ID (max 5 digits)"
              value={registerData.id || ''}
              maxLength={5}
              pattern="\d{1,5}"
              onChange={e => setRegisterData({ ...registerData, id: e.target.value.replace(/\D/g, '') })}
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={registerData.phone}
              onChange={e => setRegisterData({ ...registerData, phone: e.target.value })}
              required
            />
            <button type="submit">Register</button>
            <button type="button" onClick={() => setShowRegister(false)} style={{ marginLeft: 10 }}>Cancel</button>
          </form>
            {registerStatus && (
                <div className="register-status-message">
                  {registerStatus}
                </div>
              )}
          </div>
        </div>
      )}
        <SignInModal
              show={showSignIn}
              onClose={() => setShowSignIn(false)}
              onSignIn={user => {
                setCurrentUser(user);
                setShowSignIn(false);
              }}
            />
    </div>
  );
}

export default App;