import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { CloneMatrix, GenerateMatrix } from '../../utils/Generator';
import SetBoardMatrix from '../actions/board/SetBoardMatrix';
import SetSquareHitted from '../actions/square/SetSquareHitted';
import SetSquareEmpty from '../actions/square/SetSquareEmpty';
import SetShipEmptyUnique from '../actions/ships/SetShipEmptyUnique';
import SetLastSelectedShip from '../actions/ships/SetLastSelectedShip';
import SetShipPosition from '../actions/ships/SetShipPosition';
import SetShipEmpty from '../actions/ships/SetShipEmpty';
// import SetShipRotation from '../actions/ships/SetShipRotation';

import IBoardState from '../types/IBoard';
import {
  IGameResponse, IPlayTurnInput, IStartPlayerInput, MapCell, IGameInfoResponse,
} from '../types/IGame';
import { GetUserCookie } from '../../utils/User';

const initialBoardState: IBoardState = {
  matrix: { me: GenerateMatrix(10), opponent: GenerateMatrix(10) },
  lastSelectedShipType: undefined,
};

export const BoardSlice = createSlice({
  name: 'Board',
  initialState: initialBoardState,
  reducers: {
    setBoardMatrix: SetBoardMatrix,
    setSquareEmpty: SetSquareEmpty,
    setSquareHitted: SetSquareHitted,
    setLastSelectedShip: SetLastSelectedShip,
    setShipPosition: SetShipPosition,
    setShipEmptyUnique: SetShipEmptyUnique,
    setShipEmpty: SetShipEmpty,
    playTurnResponse: (state, action: PayloadAction<IGameResponse>) => {
      console.log('GameSlice - playTurnResponse - action: ', action);
      console.log('GameSlice - playTurnResponse  - state: ', current(state));
      const matrixMeClone = CloneMatrix(state.matrix.me);
      const matrixOpponentClone = CloneMatrix(state.matrix.opponent);

      if (action.payload.playerIdPlayed === GetUserCookie().id
        && action.payload.y !== undefined && action.payload.x !== undefined) {
        matrixOpponentClone.rows[action.payload.x].squares[action.payload.y].isHitted = true;
        matrixOpponentClone.rows[action.payload.x].squares[action.payload.y]
          .isEmpty = action.payload.cellType !== MapCell.boatTouched;
      } else if (action.payload.playerIdPlayed !== GetUserCookie().id
        && action.payload.y !== undefined && action.payload.x !== undefined) {
        matrixMeClone.rows[action.payload.x].squares[action.payload.y].isHitted = true;
      }
      return ({
        ...state,
        response: action.payload,
        matrix: { me: matrixMeClone, opponent: matrixOpponentClone },
      });
    },
    gameStartResponse: (state, action: PayloadAction<IGameResponse>) => {
      console.log('GameSlice - gameStartResponse: ', action);
      console.log(current(state));
      return ({
        ...state,
        response: action.payload,
      });
    },
    startPlayer: (state, action: PayloadAction<IStartPlayerInput>) => {
      if (state) {
        console.log(action);
      }
      return state;
    },
    startPlayerResponse: (state, action: PayloadAction<IGameInfoResponse>) => {
      if (state) {
        console.log('GameSlice - startPlayerResponse: ', action);
        console.log(current(state));
      }
      return state;
    },
    playTurn: (state, action: PayloadAction<IPlayTurnInput>) => {
      console.log('GameSlice - playTurn: ', action);
      console.log(current(state));
    },
    resetBoard: (state) => ({
      ...state,
      matrix: { me: GenerateMatrix(10), opponent: GenerateMatrix(10) },
      lastSelectedShipType: undefined,
      response: undefined,
    }),
  },
});

export const {
  setBoardMatrix,
  setSquareEmpty,
  setSquareHitted,
  setLastSelectedShip,
  setShipPosition,
  setShipEmpty,
  setShipEmptyUnique,
  playTurnResponse,
  gameStartResponse,
  startPlayer,
  startPlayerResponse,
  playTurn,
  resetBoard,
} = BoardSlice.actions;

export default BoardSlice.reducer;
