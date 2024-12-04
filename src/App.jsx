import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import UsersPage from './pages/userPage';

function App() {
    return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin-panel" element={<AdminPanelPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Routes>
    );
}

export default App;
