import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));

        // Hvis innlogging er vellykket, naviger til AdminPanelPage
        navigate('/admin-panel');
    };

    return (
        <div>
            <h1>Logg inn</h1>
            <form onSubmit={handleLogin}>
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
        </div>
    );
};

export default LoginPage;
