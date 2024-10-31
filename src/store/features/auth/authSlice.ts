import { IUser } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function clearCookies() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      return {
        ...initialState,
        user: JSON.parse(user),
      }
    }
    return initialState
  }
  return initialState
}

interface IInitialState {
  user: IUser | null | undefined;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getUser(),
  reducers: {
    userLoggedIn: (state: IInitialState, { payload }: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(payload));
      }
    },
    userLoggedOut: (state: IInitialState) => {
      state.user = undefined;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.clear();
        clearCookies()
      }
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
