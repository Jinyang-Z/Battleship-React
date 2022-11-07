import { IMatrix } from './IMatrix';
import ShipsEnum from '../../enums/ShipsEnum';
import IVector2 from './IVector2';
import { IGameResponse } from './IGame';

export default interface IBoard {
  matrix: { me: IMatrix; opponent: IMatrix };
  lastSelectedShipType?: ShipsEnum;
  lastSelectedShipPosition?: IVector2;
  lastSelectedShipRotation?: number;
  response?: IGameResponse;
}
