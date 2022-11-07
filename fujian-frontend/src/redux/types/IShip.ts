import ShipsEnum from '../../enums/ShipsEnum';
import IVector2 from './IVector2';

export default interface IShip {
  shipType: ShipsEnum;
  position: IVector2;
}
