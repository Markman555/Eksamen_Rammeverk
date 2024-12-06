import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import LoginForm from "./Components/LoginForm";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        {/* Add the route for admin-dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Optionally, add the route for user-dashboard */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
