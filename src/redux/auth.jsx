import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const setAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
            url: '/users/signup',
            method: 'POST',
            body: credentials,
            }),
            onSuccess: (response) => {
                setAuthHeader(response.token)
                return response;
            },
        }),

        logIn: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
                }),
            onSuccess: (response) => {
                setAuthHeader(response.token);
                return response;
            },
        }),

        logOut: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
            onMutate: () => {
                return setAuthHeader('');
            },
        }),

        refreshUser: builder.query({
            query: () => '/users/me',
            providesTags: ['auth'],
        }),
    })
})

export const {
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
  useRefreshUserQuery,
} = authApi;