import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const AdminPanelPage = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Hvis brukeren ikke er autentisert eller ikke er admin, send tilbake til login-siden
    if (!isAuthenticated || user.role !== 'admin') {
        navigate('/');
        return null; // Vent til brukeren er omdirigert
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Send tilbake til login-siden etter logout
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Velkommen, {user.username}!</p>
            <button onClick={handleLogout}>Logg ut</button>
            {/* Her kan admin utføre operasjoner som å opprette, se, oppdatere og slette brukere */}
        </div>
    );
};

export default AdminPanelPage;
