import React, { createContext, useState, useContext } from "react";
import { fetchUserByUsername } from "../Utils/api";  // Importer som named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Starter med null

    const login = async (username, password) => {
        if (username === "admin" && password === "admin") {
            setUser({ username: "admin", role: "admin" });  // Setter admin som bruker
            return true;
        }

        const foundUser = await fetchUserByUsername(username);  // Sjekk om brukeren finnes
        if (foundUser && foundUser.password === password) {
            setUser({ username: foundUser.username, role: foundUser.role, email: foundUser.email });
            return true;
        }

        return false;  // Feil brukernavn/passord
    };

    const logout = () => setUser(null);  // Logger ut ved å sette user til null

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // Bruk av auth context i komponenter
