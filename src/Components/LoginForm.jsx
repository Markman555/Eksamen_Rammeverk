import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await auth.login(username, password);
        if (success) {
            navigate(auth.user.role === "admin" ? "/admin" : "/user");
        } else {
            setError("Ugyldig brukernavn eller passord");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Logg inn</h2>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Brukernavn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Passord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logg inn</button>
        </form>
    );
};

export default LoginForm;
