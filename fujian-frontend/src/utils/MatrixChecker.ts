import { IMatrix } from '../redux/types/IMatrix';
import IVector2 from '../redux/types/IVector2';

const CheckNextSquareHasShip = (
  matrix: IMatrix,
  position: IVector2,
  max: number,
  rotation: number,
): boolean => {
  let status = false;
  if (rotation === 90 || rotation === 270) {
    for (let i = 0; i < max; i += 1) {
      if (
        position.y + i < 10
        && matrix.rows[position.x].squares[position.y + i].isEmpty === false
      ) {
        status = true;
      }
    }
  } else {
    for (let i = 0; i < max; i += 1) {
      if (
        position.x + i < 10
        && matrix.rows[position.x + i].squares[position.y].isEmpty === false
      ) {
        status = true;
      }
    }
  }
  return status;
};

export default CheckNextSquareHasShip;
