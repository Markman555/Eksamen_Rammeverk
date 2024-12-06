// src/components/UserDashboard.js
import React, { useState, useEffect } from "react";
import { fetchUsers } from "../Utils/api";
import { useAuth } from "../Context/AuthContext";

const UserDashboard = () => {
    const { user } = useAuth();
    const [cv, setCv] = useState(null);

    useEffect(() => {
        const loadUserCv = async () => {
            try {
                const data = await fetchUsers();
                const currentUser = data.find((u) => u.username === user.username);
                setCv(currentUser ? currentUser.cv : null);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadUserCv();
    }, [user]);


    return (
        <div>
            <h2>Velkommen, {user.username}</h2>
            {cv ? (
                <div>
                    <h3>Din CV</h3>
                    <p>{cv}</p>
                </div>
            ) : (
                <p>Ingen CV funnet.</p>
            )}
        </div>
    );
};

export default UserDashboard;
