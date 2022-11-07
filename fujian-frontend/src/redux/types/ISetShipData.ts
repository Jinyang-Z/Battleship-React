import PlayerEnum from '../../enums/PlayerEnum';
import ShipsEnum from '../../enums/ShipsEnum';
import IVector2 from './IVector2';

export default interface ISetShipData {
  player: PlayerEnum;
  shipType: ShipsEnum;
  position: IVector2;
  rotation: number;
}
