import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery, useDeleteUserMutation } from '../features/apiSlice';

const UsersPage = () => {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    if (isLoading) return <p>Laster...</p>;
    if (error) return <p>Det oppstod en feil!</p>;

    return (
        <div>
            <h1>Brukere</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                        <button onClick={() => deleteUser(user._id)}>Slett</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
