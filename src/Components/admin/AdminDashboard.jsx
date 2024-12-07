import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, deleteUser, updateUser } from "../../Utils/UserApi";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", password: "", email: "", role: "user" });
    const [editingUserId, setEditingUserId] = useState(null); // ID-en til brukeren som redigeres
    const [editingUser, setEditingUser] = useState(null); // Kopi av brukeren som redigeres

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
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
            await createUser(newUser);
            setNewUser({ username: "", password: "", email: "", role: "user" });

            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);

            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEditUser = (user) => {
        setEditingUserId(user._id); // Sett ID-en til brukeren som redigeres
        setEditingUser({ ...user }); // Lag en kopi av brukeren
    };

    const handleUpdateUser = async () => {
        if (!editingUser.username || !editingUser.email || !editingUser.role) {
            alert("Alle felt må fylles ut");
            return;
        }
    
        const updatedData = {
            username: editingUser.username,
            email: editingUser.email,
            role: editingUser.role,
        };
    
        console.log("Oppdatering av bruker:", updatedData);
    
        try {
            // Oppdater bruker
            await updateUser(editingUserId, updatedData);
    
            // Oppdater brukerlisten i UI uten å hente den fra serveren
            const updatedUsers = users.map((user) =>
                user._id === editingUserId ? { ...user, ...updatedData } : user
            );
            setUsers(updatedUsers);
    
            // Nullstill redigeringsmodus
            setEditingUserId(null);
            setEditingUser(null);
        } catch (error) {
            console.error("Kunne ikke oppdatere bruker:", error.message);
        }
    };
    
    

    const handleCancelEdit = () => {
        setEditingUserId(null);
        setEditingUser(null);
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
                        {editingUserId === user._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingUser.username}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, username: e.target.value })
                                    }
                                />
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, email: e.target.value })
                                    }
                                />
                                <select
                                    value={editingUser.role}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, role: e.target.value })
                                    }
                                >
                                    <option value="user">Bruker</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <button onClick={handleUpdateUser}>Lagre</button>
                                <button onClick={handleCancelEdit}>Avbryt</button>
                            </>
                        ) : (
                            <>
                                {user.username} ({user.email}) - {user.role}
                                <button onClick={() => handleEditUser(user)}>Rediger</button>
                                <button onClick={() => handleDeleteUser(user._id)}>Slett</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
