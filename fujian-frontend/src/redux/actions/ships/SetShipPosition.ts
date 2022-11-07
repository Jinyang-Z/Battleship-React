import { PayloadAction } from '@reduxjs/toolkit';
import SetCruiser from './SetCruiser';
import SetDestroyer from './SetDestroyer';
import SetSubmarine from './SetSubmarine';
import SetBattleship from './SetBattleship';
import SetCarrier from './SetCarrier';
import IBoardState from '../../types/IBoard';
import ShipsEnum from '../../../enums/ShipsEnum';
import ISetShipData from '../../types/ISetShipData';

const SetShipPosition = (
  state: IBoardState,
  action: PayloadAction<ISetShipData>,
) => {
  let matrix = null;
  switch (action.payload.shipType) {
    case ShipsEnum.CRUISER:
      matrix = SetCruiser(state, action);
      break;
    case ShipsEnum.DESTROYER:
      matrix = SetDestroyer(state, action);
      break;
    case ShipsEnum.SUBMARINE:
      matrix = SetSubmarine(state, action);
      break;
    case ShipsEnum.BATTLESHIP:
      matrix = SetBattleship(state, action);
      break;
    case ShipsEnum.CARRIER:
      matrix = SetCarrier(state, action);
      break;
    default:
      break;
  }
  return {
    ...state,
    matrix: { ...state.matrix, [action.payload.player]: matrix },
    lastSelectedShipType: action.payload.shipType,
    lastSelectedShipPosition: action.payload.position,
    lastSelectedShipRotation: action.payload.rotation,
  };
};

export default SetShipPosition;
