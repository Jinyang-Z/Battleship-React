import { PayloadAction } from '@reduxjs/toolkit';
import { CloneMatrixWithoutShip } from '../../../utils/Generator';
import PlayerEnum from '../../../enums/PlayerEnum';
import ShipsEnum from '../../../enums/ShipsEnum';
import IBoardState from '../../types/IBoard';

const SetShipEmptyUnique = (state: IBoardState, action: PayloadAction<ShipsEnum>) => {
  const matrix = CloneMatrixWithoutShip(
    state.matrix[PlayerEnum.ME],
    action.payload,
  );
  switch (action.payload) {
    case ShipsEnum.CRUISER:
      if (matrix.cruiserNumber > 0) {
        matrix.cruiserNumber -= 1;
      }
      break;
    case ShipsEnum.DESTROYER:
      if (matrix.destroyerNumber > 0) {
        matrix.destroyerNumber -= 1;
      }
      break;
    case ShipsEnum.SUBMARINE:
      if (matrix.submarineNumber > 0) {
        matrix.submarineNumber -= 1;
      }
      break;
    case ShipsEnum.BATTLESHIP:
      if (matrix.battleshipNumber > 0) {
        matrix.battleshipNumber -= 1;
      }
      break;
    case ShipsEnum.CARRIER:
      if (matrix.carrierNumber > 0) {
        matrix.carrierNumber -= 1;
      }
      break;
    default:
      break;
  }
  return {
    ...state,
    matrix: { ...state.matrix, [PlayerEnum.ME]: matrix },
    lastSelectedShipType: undefined,
    lastSelectedShipPosition: undefined,
    lastSelectedShipRotation: undefined,
  };
};

export default SetShipEmptyUnique;
