import { createSlice } from '@reduxjs/toolkit';
import { UserSliceI, UserStoreI } from '../../types/common';

const loadStateFromLocalStorage = (): UserStoreI => {
  try {
    const serializedState = localStorage.getItem('store');
    if (serializedState === null) return defaultState.store;
    const parsedState = JSON.parse(serializedState);
    if (isUser(parsedState)) {
      return parsedState;
    }
    return defaultState.store;
  } catch (e) {
    console.error('Ошибка при загрузке из localStorage:', e);
    return defaultState.store;
  }
};

const defaultState: UserSliceI = {
  store: {
    accessToken: null,
    isAuthenticated: false,
    user: null,
  },
};

function isUser(store: unknown): store is UserStoreI {
  return (
    typeof store === 'object' &&
    store !== null &&
    'accessToken' in store &&
    'isAuthenticated' in store &&
    'user' in store
  );
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    store: loadStateFromLocalStorage(),
  },
  reducers: {
    userInit: (state, { payload: userInit }) => {
      if (isUser(userInit)) {
        const user = JSON.stringify(userInit);
        state.store = JSON.parse(user);
      }
    },
    setUser: (state, { payload: userStore }) => {
      state.store = { ...userStore };
    },
  },
});

export const { actions, reducer } = userSlice;
