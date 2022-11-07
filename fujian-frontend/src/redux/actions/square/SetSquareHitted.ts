import { PayloadAction } from '@reduxjs/toolkit';
import { CloneMatrix } from '../../../utils/Generator';

import IBoardState from '../../types/IBoard';
import PlayerEnum from '../../../enums/PlayerEnum';
import IVector2 from '../../types/IVector2';

export interface ISetSquareHitted {
  player: PlayerEnum;
  position: IVector2;
  status: boolean;
}

const SetSquareHitted = (
  state: IBoardState,
  action: PayloadAction<ISetSquareHitted>,
) => {
  const matrix = CloneMatrix(state.matrix[action.payload.player]);
  matrix.rows[action.payload.position.x].squares[
    action.payload.position.y
  ].isHitted = action.payload.status;
  return {
    ...state,
    matrix: { ...state.matrix, [action.payload.player]: matrix },
  };
};

export default SetSquareHitted;
