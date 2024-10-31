import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "https://whats-challenge-task-be.us.aldryn.io/api",
  credentials: 'same-origin',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      headers.set('Authorization', `token ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'Profile',
    'Products',
  ],
  endpoints: () => ({}),
});
