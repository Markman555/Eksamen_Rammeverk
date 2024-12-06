import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, deleteUser } from "../Utils/api";  // Bruk named import


const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", password: "", email: "", role: "user" });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers(); // Bruk  fetchUsers'
                setUsers(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadUsers();
    }, []);

    const handleCreateUser = async () => {
        if (!newUser.username || !newUser.password || !newUser.email || !newUser.role) {
            alert("Alle felt må fylles ut");
            return;
        }
        try {
            await createUser(newUser); // Bruk  createUser'
            setNewUser({ username: "", password: "", email: "", role: "user" });

            // Oppdater brukerlisten
            const data = await fetchUsers(); // Bruk  fetchUsers'
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id); // Bruk  deleteUser'

            // Oppdater brukerlisten
            const data = await fetchUsers(); // Bruk  fetchUsers'
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Opprett ny bruker</h3>
            <input
                type="text"
                placeholder="Brukernavn"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Passord"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <input
                type="email"
                placeholder="E-post"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
                <option value="user">Bruker</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleCreateUser}>Opprett</button>

            <h3>Eksisterende brukere</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} ({user.email}) - {user.role}
                        <button onClick={() => handleDeleteUser(user._id)}>Slett</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

