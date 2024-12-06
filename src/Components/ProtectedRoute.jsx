// src/components/ProtectedRoute.js
import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
    const { user } = useAuth();
    if (!user || (role && user.role !== role)) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
