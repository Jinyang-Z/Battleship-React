import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMessageState from '../types/IMessage';

const initialState: IMessageState = {
  message: undefined,
};

export const MessageSlice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => ({
      ...state,
      message: action.payload,
    }),
  },
});

export const { setMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
