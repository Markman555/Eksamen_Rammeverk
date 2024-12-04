import React, { useState } from 'react';
import { useAddUserMutation } from '../features/apiSlice';

const AddUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addUser] = useAddUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser({ name, email });
    };

    return (
        <div>
            <h1>Legg til bruker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Navn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Legg til</button>
            </form>
        </div>
    );
};

export default AddUserPage;
