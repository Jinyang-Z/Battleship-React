import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGameResponse } from '../types/IGame';
import IRoom, {
  ICreateRoomInput,
  IJoinRoomInput,
  ILeaveRoomInput,
  IJoinRoomOutput,
} from '../types/IRoom';

interface IRoomState {
  room?: IRoom;
  game?: IGameResponse;
  isConnected: boolean;
  isEstablishingConnection: boolean;
  isLoading: boolean;
  isError: boolean;
  isWaitingForOtherPlayer: boolean;
  isWaitingGameStart: boolean;
}
const initialState: IRoomState = {
  room: undefined,
  game: undefined,
  isEstablishingConnection: false,
  isConnected: false,
  isLoading: false,
  isError: false,
  isWaitingForOtherPlayer: true,
  isWaitingGameStart: true,
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
    createRoom: (state, action: PayloadAction<ICreateRoomInput>) => ({
      ...state,
      room: { ...action.payload, id: '', players: [] },
    }),
    updateRoom: (state, action: PayloadAction<IRoom>) => {
      if (action.payload === undefined) {
        return {
          room: undefined,
          game: undefined,
          isEstablishingConnection: false,
          isConnected: false,
          isLoading: false,
          isError: false,
          isWaitingForOtherPlayer: true,
          isWaitingGameStart: true,
        };
      }
      return {
        ...state,
        room: action.payload,
      };
    },
    joinRoom: (state, action: PayloadAction<IJoinRoomInput>) => {
      if (state.room) {
        state.room.players.push({
          id: action.payload.playerId,
          pseudo: '',
          hasJoined: false,
        });
      }
    },
    joinRoomResponse: (state, action: PayloadAction<IJoinRoomOutput>) => {
      if (state.room && state.room?.players.length <= 1) {
        state.room.players.push({
          id: action.payload.player.id,
          pseudo: action.payload.player.pseudo,
          hasJoined: action.payload.player.hasJoined,
        });
      }
      return state;
    },
    roomIsFull: (state) => ({
      ...state,
      isWaitingForOtherPlayer: false,
      isWaitingGameStart: false,
    }),
    leaveRoom: (state, action: PayloadAction<ILeaveRoomInput>) => {
      if (state.room) {
        const players = state.room.players.filter(
          (player) => player.id !== action.payload.playerId,
        );
        if (players.length === 0) {
          return {
            room: undefined,
            isEstablishingConnection: false,
            isConnected: false,
            isLoading: false,
            isError: false,
            isWaitingForOtherPlayer: true,
            isWaitingGameStart: true,
          };
        }
        return { ...state, room: { ...state.room, players } };
      }
      return { ...state };
    },
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
  createRoom,
  updateRoom,
  joinRoomResponse,
  roomIsFull,
  joinRoom,
  leaveRoom,
  setIsLoading,
  setIsError,
} = RoomSlice.actions;

export default RoomSlice.reducer;
