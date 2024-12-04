import { createSlice } from '@reduxjs/toolkit';

// Initial tilstand for autentisering
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Hardkodet admin bruker
const adminUser = {
    username: 'admin123',
    password: 'admin123',
    role: 'admin',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;

            // Logg inn informasjonen som kommer inn
            console.log('Login action received:', action.payload);

            if (username === adminUser.username && password === adminUser.password) {
                state.isAuthenticated = true;
                state.user = { ...adminUser };
                console.log('Logged in as admin');
            } else {
                console.log('Incorrect credentials or not an admin');
                state.isAuthenticated = false;
                state.user = null;
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
