import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import UserProfilePage from './pages/userPage';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {isAuthenticated && user?.role === 'admin' ? (
        <Route path="/admin-panel" element={<AdminPanelPage />} />
      ) : null}
      {isAuthenticated && user?.role === 'user' ? (
        <Route path="/profile" element={<UserProfilePage />} />
      ) : null}
      {/* Hvis brukeren ikke er autentisert, kan du dirigere til login-siden */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
