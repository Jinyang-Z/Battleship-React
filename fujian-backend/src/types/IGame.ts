export enum MapCell {
  void,
  voidTouched,
  boat,
  boatTouched,
}

interface IVector2 {
  x: number,
  y: number,
  isTouched: boolean,
}

export interface IBoat {
  coordinates: IVector2[];
  isDestroyed?: boolean,
}

export interface IGameBoat {
  data: IBoat[]; 
  playerId: string;
}

export interface IGameMap {
  map: MapCell[][];
  playerId: string
}

export interface IStartPlayerInput {
  roomId: string,
  playerId: string,
  boats: IBoat[],
}

export interface IPlayTurnInput {
  playerId: string,
  roomId: string,
  x: number;
  y: number;
}

export interface IGameResponse {
  playerIdToPlay: string;
  playerIdPlayed?: string;
  x?: number;
  y?: number;
  cellType?: MapCell;
  playerIdWin?: string;
}
