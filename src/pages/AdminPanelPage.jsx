import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation } from '../features/apiSlice';
import handleCreateUser from '../utils/userUtils'

const AdminPanelPage = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: users, isLoading, error } = useGetUsersQuery();  // Henter alle brukere
    const [addUser] = useAddUserMutation();  // For å opprette ny bruker
    const [deleteUser] = useDeleteUserMutation();  // For å slette bruker
    console.log(users);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect er unødvendig i dette tilfellet, da useGetUsersQuery allerede henter data
    useEffect(() => {
        if (user?.role !== 'admin') {
            navigate('/'); // Hvis ikke admin, naviger til login
        }
    }, [dispatch, navigate, user?.role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(newUser).unwrap(); // Directly call addUser mutation
            console.log('User created successfully');
            setNewUser({ name: '', email: '', password: '', role: 'user' }); // Reset form
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };
    

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Send tilbake til login-siden etter logout
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id).unwrap(); // Unwraps the Promise to handle errors properly
            console.log(`User with ID ${id} deleted successfully`);
        } catch (err) {
            console.error(`Error deleting user with ID ${id}:`, err);
        }
    };
    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Velkommen, {user?.username}!</p>
            <button onClick={handleLogout}>Logg ut</button>

            <h2>Opprett ny bruker</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Navn:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">E-post:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Passord:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Rolle:</label>
                    <select
                        id="role"
                        name="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="user">Bruker</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Opprett bruker</button>
            </form>

            <h2>Alle brukere</h2>
            {isLoading && <p>Laster brukere...</p>}
            {error && <p>{error.message}</p>}
            <ul>
                {users?.map((user) => (
                    <li key={user._id}>
                        {user.name} ({user.email}) - {user.role}
                        <button onClick={() => handleDelete(user._id)}>Slett bruker</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanelPage;
