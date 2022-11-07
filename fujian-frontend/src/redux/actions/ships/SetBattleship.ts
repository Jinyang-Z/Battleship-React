import { PayloadAction } from '@reduxjs/toolkit';
import { CloneMatrix } from '../../../utils/Generator';
import CheckNextSquareHasShip from '../../../utils/MatrixChecker';
import IBoardState from '../../types/IBoard';
import ISetShipData from '../../types/ISetShipData';
import ShipsEnum from '../../../enums/ShipsEnum';
import { ShipPosition } from '../../types/IMatrix';
import IVector2 from '../../types/IVector2';

const SetBattleship = (
  state: IBoardState,
  action: PayloadAction<ISetShipData>,
) => {
  const matrix = CloneMatrix(state.matrix[action.payload.player]);
  if (
    matrix.battleshipNumber < 1
    && !CheckNextSquareHasShip(
      matrix,
      action.payload.position,
      4,
      action.payload.rotation,
    )
  ) {
    const positions: ShipPosition[] = matrix.shipsPositions;
    const coordinates: ShipPosition = {
      shipType: ShipsEnum.BATTLESHIP,
      coordinates: [],
    };
    if (action.payload.rotation === 90 || action.payload.rotation === 270) {
      if (action.payload.position.y + 3 < 10) {
        for (let i = 0; i < 4; i += 1) {
          matrix.rows[action.payload.position.x].squares[
            action.payload.position.y + i
          ].isEmpty = false;
          matrix.rows[action.payload.position.x].squares[
            action.payload.position.y + i
          ].shipType = action.payload.shipType;
          matrix.rows[action.payload.position.x].squares[
            action.payload.position.y + i
          ].shipPart = i;
          matrix.rows[action.payload.position.x].squares[
            action.payload.position.y + i
          ].shipRotation = action.payload.rotation;
          coordinates.coordinates.push({
            x: action.payload.position.x,
            y: action.payload.position.y + i,
          } as IVector2);
        }
        matrix.battleshipNumber += 1;
      }
    } else if (action.payload.position.x + 3 < 10) {
      for (let i = 0, j = 3; i < 4; i += 1, j -= 1) {
        matrix.rows[action.payload.position.x + i].squares[
          action.payload.position.y
        ].isEmpty = false;
        matrix.rows[action.payload.position.x + i].squares[
          action.payload.position.y
        ].shipType = action.payload.shipType;
        matrix.rows[action.payload.position.x + i].squares[
          action.payload.position.y
        ].shipPart = j;
        matrix.rows[action.payload.position.x + i].squares[
          action.payload.position.y
        ].shipRotation = action.payload.rotation;
        coordinates.coordinates.push({
          x: action.payload.position.x + i,
          y: action.payload.position.y,
        } as IVector2);
      }
      matrix.battleshipNumber += 1;
    }
    if (coordinates.coordinates.length > 0) {
      matrix.shipsPositions = positions.concat(coordinates);
    }
  }
  return matrix;
};

export default SetBattleship;
