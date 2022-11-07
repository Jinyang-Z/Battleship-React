import { GenerateMatrix } from '../../../utils/Generator';
import PlayerEnum from '../../../enums/PlayerEnum';
import IBoardState from '../../types/IBoard';

const SetShipEmpty = (state: IBoardState) => {
  const matrix = GenerateMatrix(
    state.matrix.me.rows.length,
  );
  matrix.battleshipNumber = 0;
  matrix.carrierNumber = 0;
  matrix.cruiserNumber = 0;
  matrix.destroyerNumber = 0;
  matrix.cruiserNumber = 0;
  matrix.shipsPositions = [];
  return {
    ...state,
    matrix: { ...state.matrix, [PlayerEnum.ME]: matrix },
    lastSelectedShipType: undefined,
    lastSelectedShipPosition: undefined,
    lastSelectedShipRotation: undefined,
  };
};

export default SetShipEmpty;
