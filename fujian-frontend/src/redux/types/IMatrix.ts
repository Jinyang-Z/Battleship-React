import IVector2 from './IVector2';
import ShipsEnum from '../../enums/ShipsEnum';

export interface ISquare {
  id: string;
  isEmpty: boolean;
  isHitted: boolean;
  position: IVector2;
  shipType?: ShipsEnum;
  shipPart?: number;
  shipRotation?: number;
}

export interface IRow {
  id: string;
  squares: ISquare[];
}

export interface ShipPosition {
  shipType: ShipsEnum;
  coordinates: IVector2[];
  isDestroyed?: boolean;
}

export interface IMatrix {
  id: string;
  rows: IRow[];
  cruiserNumber: number;
  destroyerNumber: number;
  submarineNumber: number;
  battleshipNumber: number;
  carrierNumber: number;
  shipsPositions: ShipPosition[];
}
