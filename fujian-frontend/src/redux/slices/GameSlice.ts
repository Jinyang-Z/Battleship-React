import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PlayerEnum from '../../enums/PlayerEnum';
import { GetUserCookie } from '../../utils/User';
import IGameState, { IGameInfoResponse, IGameResponse } from '../types/IGame';

const initialGameState: IGameState = {
  response: undefined,
  size: 10,
  turn: PlayerEnum.ME,
  playerIsReady: false,
  opponentIsReady: false,
  isPlaying: false,
  isLoading: false,
  isWaiting: false,
  time: 30,
  winner: null,
};

export const GameSlice = createSlice({
  name: 'Game',
  initialState: initialGameState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setIsWaiting: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isWaiting: action.payload,
    }),
    setTime: (state, action: PayloadAction<number>) => ({
      ...state,
      time: action.payload,
    }),
    setWinner: (state, action: PayloadAction<string>) => {
      if (GetUserCookie().id === action.payload) {
        return { ...state, winner: PlayerEnum.ME };
      }
      return { ...state, winner: PlayerEnum.OPPONENT };
    },
    updateIsReadyStatus: (state, action: PayloadAction<IGameInfoResponse>) => {
      if (action.payload.gameMap.length === 2) {
        return {
          ...state,
          playerIsReady: true,
          opponentIsReady: true,
        };
      }
      if (GetUserCookie().id === action.payload.gameMap[0].playerId) {
        return {
          ...state,
          playerIsReady: true,
        };
      }
      return {
        ...state,
        opponentIsReady: true,
      };
    },
    updateTurn: (state, action: PayloadAction<IGameResponse>) => {
      if (GetUserCookie().id === action.payload.playerIdToPlay) {
        return {
          ...state,
          turn: PlayerEnum.ME,
        };
      }
      return {
        ...state,
        turn: PlayerEnum.OPPONENT,
      };
    },
    resetGame: (state) => ({
      ...state,
      response: undefined,
      size: 10,
      turn: PlayerEnum.ME,
      playerIsReady: false,
      opponentIsReady: false,
      isPlaying: false,
      isLoading: false,
      isWaiting: false,
      time: 30,
      winner: null,
    }),
  },
});

export const {
  setIsLoading,
  setIsWaiting,
  setTime,
  setWinner,
  updateIsReadyStatus,
  updateTurn,
  resetGame,
} = GameSlice.actions;

export default GameSlice.reducer;
