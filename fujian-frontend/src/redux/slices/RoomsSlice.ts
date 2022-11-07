import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IRooms from '../types/IRooms';
// import CreateRoom from '../actions/room/CreateRoom';

interface IRoomsState {
  rooms: IRooms;
  isConnected: boolean;
  isEstablishingConnection: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IRoomsState = {
  rooms: { rooms: [] },
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
  isError: false,
};

export const RoomSlice = createSlice({
  name: 'Room',
  initialState,
  reducers: {
    startConnecting: (state) => ({
      ...state,
      isEstablishingConnection: true,
      isConnected: false,
    }),
    connectionEstablished: (state) => ({
      ...state,
      isEstablishingConnection: true,
      isConnected: true,
    }),
    getRooms: (state, action: PayloadAction<IRooms>) => ({
      ...state,
      rooms: action.payload,
    }),
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setIsError: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isError: action.payload,
    }),
  },
});

export const {
  startConnecting,
  connectionEstablished,
  getRooms,
  setIsLoading,
  setIsError,
} = RoomSlice.actions;

export default RoomSlice.reducer;
