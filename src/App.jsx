import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import LoginForm from "./Components/LoginForm";
import AdminDashboard from "./Components/admin/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./style/App.css";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;