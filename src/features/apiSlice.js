import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for CRUDCRUD API
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8/', // Insert your CRUDCRUD API key here
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Users', 'Cvs'], // Define tag types for users and CVs
    endpoints: (builder) => ({
        // User endpoints
        getUsers: builder.query({
            query: () => 'users', // Fetch all users
            providesTags: ['Users'], // This query is associated with the 'Users' tag
        }),
        getUser: builder.query({
            query: (id) => `users/${id}`, // Fetch a single user by ID
            providesTags: (result, error, id) => [{ type: 'Users', id }], // Associate specific user ID with the 'Users' tag
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'], // Invalidate the 'Users' tag to refetch user data
        }),
        updateUser: builder.mutation({
            query: ({ id, user }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }], // Invalidate the specific user's cache
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }], // Invalidate the specific user's cache
        }),

        // CV endpoints
        getCvs: builder.query({
            query: () => 'cvs', // Fetch all CVs
            providesTags: ['Cvs'], // This query is associated with the 'Cvs' tag
        }),
        getCv: builder.query({
            query: (id) => `cvs/${id}`, // Fetch a single CV by ID
            providesTags: (result, error, id) => [{ type: 'Cvs', id }], // Associate specific CV ID with the 'Cvs' tag
        }),
        addCv: builder.mutation({
            query: (cv) => ({
                url: 'cvs',
                method: 'POST',
                body: cv,
            }),
            invalidatesTags: ['Cvs'], // Invalidate the 'Cvs' tag to refetch CV data
        }),
        updateCv: builder.mutation({
            query: ({ id, cv }) => ({
                url: `cvs/${id}`,
                method: 'PUT',
                body: cv,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Cvs', id }], // Invalidate the specific CV's cache
        }),
        deleteCv: builder.mutation({
            query: (id) => ({
                url: `cvs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Cvs', id }], // Invalidate the specific CV's cache
        }),
    }),
});

// Export hooks for API calls
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
