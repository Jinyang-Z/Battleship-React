import { PayloadAction } from '@reduxjs/toolkit';
import PlayerEnum from '../../../enums/PlayerEnum';
import ShipsEnum from '../../../enums/ShipsEnum';
import IBoardState from '../../types/IBoard';
import { IMatrix } from '../../types/IMatrix';

const GetShipPositionAndRotation = (matrix: IMatrix, shipType?: ShipsEnum) => {
  for (let i = 0; i < matrix.rows.length; i += 1) {
    for (let j = 0; j < matrix.rows[i].squares.length; j += 1) {
      if (matrix.rows[i].squares[j].shipType === shipType) {
        return {
          position: matrix.rows[i].squares[j].position,
          rotation: matrix.rows[i].squares[j].shipRotation,
        };
      }
    }
  }
  return undefined;
};

const SetLastSelectedShip = (
  state: IBoardState,
  action: PayloadAction<ShipsEnum>,
) => {
  const result = GetShipPositionAndRotation(
    state.matrix[PlayerEnum.ME],
    action.payload,
  );
  return {
    ...state,
    lastSelectedShipType: action.payload,
    lastSelectedShipPosition: result?.position,
    lastSelectedShipRotation: result?.rotation,
  };
};

export default SetLastSelectedShip;
