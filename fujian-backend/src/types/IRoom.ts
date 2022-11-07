import { WSRoom } from '../WSModels/WSRoom';

export interface IRoomUser {
  id: string;
  pseudo: string;
  hasJoined: boolean;
}

export interface ICreateRoomInput {
  name: string;
  capacity: number;
  mapSize: number;
  shipsAmount: number;
  shootPerTurn: number;
  secondsPerTurn: number;
  password?: string;
  userId: string;
}

export interface IJoinRoomInput {
  roomId: string;
  playerId: string;
  password?: string;
}

export interface IJoinRoomOutput {
  room: WSRoom;
  player: IRoomUser;
  password?: string;
}

export interface ILeaveRoomInput {
  roomId: string;
  playerId: string;
}
