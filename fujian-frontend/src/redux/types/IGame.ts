import PlayerEnum from '../../enums/PlayerEnum';
import IVector2 from './IVector2';

export default interface IGame {
  response?: IGameResponse;
  size: number;
  turn: PlayerEnum;
  playerIsReady: boolean;
  opponentIsReady: boolean;
  // isLoading : Loading content
  isLoading: boolean;
  // isPlaying : Current game is playing or not
  isPlaying: boolean;
  // isWaiting : Waiting player/opponent attack
  isWaiting: boolean;
  // time : Time left to attack
  time: number;

  // isGameStarted: boolean;
  // isGameOver: boolean;
  winner: PlayerEnum | null;
}

export enum MapCell {
  void,
  voidTouched,
  boat,
  boatTouched,
}

export interface IStartPlayerInput {
  roomId: string,
  playerId: string,
  boats: { coordinates: IVector2[] }[],
}

export interface IPlayTurnInput {
  playerId: string,
  roomId: string,
  x: number;
  y: number;
}

export interface IGameMap {
  map: MapCell[][];
  playerId: string
}

export interface IGameResponse {
  playerIdToPlay: string;
  playerIdPlayed?: string;
  x?: number;
  y?: number;
  cellType?: MapCell;
  playerIdWin?: string;
}

export interface IGameInfoResponse {
  gameMap: IGameMap[];
}
