import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
    }),
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['contacts'],
        }),

        createContact: builder.mutation({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact, 
            }),
            invalidatesTags: ['contacts'],
        }),

        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['contacts'],
        })
    }),
})

export const {
    useGetContactsQuery,
    useCreateContactMutation,
    useDeleteContactMutation
} = contactApi; 
