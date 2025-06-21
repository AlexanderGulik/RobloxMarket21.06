import { createSlice } from '@reduxjs/toolkit';
import { MessageI } from '../../types/common';

export interface MessagesSliceI {
  messages: MessageI[];
}

const defaultState: MessagesSliceI = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: defaultState,
  reducers: {
    addMessage: (state, { payload: message }: { payload: MessageI }) => {
      state.messages = [...state.messages, message];
    },
    removeMessage: (state, { payload: id }: { payload: number }) => {
      state.messages = state.messages.filter((message) => message.id !== id);
    },
  },
});

export const { actions, reducer } = messagesSlice;
