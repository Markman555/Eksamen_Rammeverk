// src/Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";  // Ensure correct import path

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();  // Assuming you are using AuthContext

    if (!user) {
        return <Navigate to="/" />; // Redirect to login if not logged in
    }

    if (user.role !== role) {
        return <Navigate to="/" />; // Redirect if the user role does not match
    }

    return children; // Render children if role matches
};

export default ProtectedRoute;
