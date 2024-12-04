import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for CRUDCRUD API
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8/', // Sett inn din CRUDCRUD API-nøkkel her
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        // Bruker-endepunkter
        getUsers: builder.query({
            query: () => 'users', // Hent alle brukere
        }),
        getUser: builder.query({
            query: (id) => `users/${id}`, // Hent én bruker etter ID
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, user }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
        }),

        // CV-endepunkter
        getCvs: builder.query({
            query: () => 'cvs', // Hent alle CV-er
        }),
        getCv: builder.query({
            query: (id) => `cvs/${id}`, // Hent én CV etter ID
        }),
        addCv: builder.mutation({
            query: (cv) => ({
                url: 'cvs',
                method: 'POST',
                body: cv,
            }),
        }),
        updateCv: builder.mutation({
            query: ({ id, cv }) => ({
                url: `cvs/${id}`,
                method: 'PUT',
                body: cv,
            }),
        }),
        deleteCv: builder.mutation({
            query: (id) => ({
                url: `cvs/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export hooks for API-kallene
export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetCvsQuery,
    useGetCvQuery,
    useAddCvMutation,
    useUpdateCvMutation,
    useDeleteCvMutation,
} = apiSlice;

