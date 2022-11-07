export interface IRoomUser {
  id: string;
  pseudo: string;
  hasJoined: boolean;
}

export default interface IRoom {
  id: string;
  name: string;
  capacity: number;
  mapSize: number;
  shipsAmount: number;
  shootPerTurn: number;
  secondsPerTurn: number;
  password?: string;
  players: IRoomUser[];
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
  room: IRoom;
  player: IRoomUser;
  password?: string;
}

export interface ILeaveRoomInput {
  roomId: string;
  playerId: string;
}
