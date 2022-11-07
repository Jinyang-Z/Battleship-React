import { PayloadAction } from '@reduxjs/toolkit';
import { GenerateMatrix } from '../../../utils/Generator';
import IBoardState from '../../types/IBoard';
import PlayerEnum from '../../../enums/PlayerEnum';

export interface ISetMatrix {
  player: PlayerEnum;
  size: number;
}

const SetBoardMatrix = (state: IBoardState, action: PayloadAction<ISetMatrix>) => {
  if (action.payload.size % 10 === 0) {
    return {
      ...state,
      matrix: {
        ...state.matrix,
        [action.payload.player]: GenerateMatrix(action.payload.size),
      },
    };
  }
  return {
    ...state,
    matrix: { ...state.matrix, [action.payload.player]: GenerateMatrix(10) },
  };
};

export default SetBoardMatrix;
