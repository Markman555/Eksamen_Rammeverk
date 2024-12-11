import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchUsers } from "../Utils/UserApi"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const admin = { username: "admin", password: "admin", role: "admin" };

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
    
        console.log(`Logging in with username: ${username}, password: ${password}`);
    
        if (username === admin.username && password === admin.password) {
            console.log("Admin login successful");
            setUser({ username: admin.username, role: admin.role });
            setIsLoading(false);
            return true;
        }
    
        try {
            const users = await fetchUsers(); // Hent alle brukerne
            const foundUser = users.find((u) => u.username === username); // Finn brukeren basert på username
    
            console.log("Found user:", foundUser);
    
            if (foundUser && foundUser.password === password) {
                setUser({ username: foundUser.username, role: foundUser.role, email: foundUser.email });
                console.log("User login successful:", foundUser);
                setIsLoading(false);
                return true;
            } else {
                setError("Feil brukernavn eller passord");
                setIsLoading(false);
                return false;
            }
        } catch (err) {
            setError("Feil under henting av bruker");
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        console.log("User has been set:", user); // Debugging log
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

