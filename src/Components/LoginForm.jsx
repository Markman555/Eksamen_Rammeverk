import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, user, isLoading, error } = useAuth(); // Destructure login, user, etc.
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
        }
    };

    // Use useEffect to listen for user changes
    useEffect(() => {
        if (user) {
            console.log("User logged in:", user);
            if (user.role === "admin") {
                navigate("/admin-dashboard");  // Navigate after user state is set
            } else if (user.role === "user") {
                navigate("/user-dashboard");
            }
        }
    }, [user, navigate]);  // Only runs when `user` changes


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
    );
};

export default LoginForm;
