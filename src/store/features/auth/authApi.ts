// store/authApi.ts

import toast from 'react-hot-toast';
import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';
import { ILoginResponse, IUser } from '@/lib/types';
import { LOGIN_URL, PRODUCTS_URL, SELECt_PRODUCTS_URL } from './endpoints';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Dispatching logged data to redux state
          if (data && data.data) {
            dispatch(userLoggedIn(data.data.user_data));
            localStorage.setItem('authToken', data.data.token)
            toast.success('Login successful');
          } else {
            toast.success('An unknown error occurred');

          }
        } catch (error: any) {
          // Extract the error message from the error object
          const errorMessage =
            error?.error?.data?.message || 'An unknown error occurred';
          // Display the error message using toast
          toast.error(errorMessage);
        }
      },
    }),

    getProducts: builder.query({
      query: (params) => ({ url: PRODUCTS_URL, params, }),
      providesTags: ['Products'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          // toast.error(error.error.data.message);
        }
      },
    }),
    selectProducts: builder.mutation({
      query: (body) => ({
        url: SELECt_PRODUCTS_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            toast.success("Product selected successfully")
          }
        } catch (error: any) {
          toast.error("Error selecting successfully")
        }
      },
    }),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const { useLoginMutation, useLazyGetProductsQuery, useSelectProductsMutation } =
  authApi;
