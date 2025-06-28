import React, { useState } from 'react';

export default function SignInModal({ show, onClose, onSignIn }) {
  const [signInData, setSignInData] = useState({ name: '', phone: '', code: '' });
  const [signInStatus, setSignInStatus] = useState('');

  if (!show) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInStatus('');
    try {
      const params = new URLSearchParams({
        Id: signInData.code.trim(),
        Name: signInData.name.trim(),
        Phone: signInData.phone.trim()
      });
      const response = await fetch(
        `https://localhost:7099/api/User/exists?${params.toString()}`,
        { method: 'POST' }
      );
      const exists = await response.json();
      if (exists === true) {
        setSignInStatus('You have successfully signed in! Welcome back.');
        onSignIn({
          id: signInData.code,
          name: signInData.name,
          phone: signInData.phone
        });
        setTimeout(() => {
          setSignInStatus('');
          onClose();
        }, 1500);
      } else {
        setSignInStatus('User was not found. Please check your details.');
      }
    } catch (err) {
      setSignInStatus('Sign in failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Sign In</h2>
        <form className="register-form" onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Name"
            value={signInData.name}
            onChange={e => setSignInData({ ...signInData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Cell Number"
            value={signInData.phone}
            onChange={e => setSignInData({ ...signInData, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Code (max 5 digits)"
            value={signInData.code}
            maxLength={5}
            pattern="\d{1,5}"
            onChange={e => setSignInData({ ...signInData, code: e.target.value.replace(/\D/g, '') })}
            required
          />
          <button type="submit">Sign In</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>Cancel</button>
        </form>
        {signInStatus && (
          <div className="register-status-message">
            {signInStatus}
          </div>
        )}
      </div>
    </div>
  );
}