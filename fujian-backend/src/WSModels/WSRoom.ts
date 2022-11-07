import { v4 as uuid } from 'uuid';

import User from '../db/models/UserModel';

import {
  IRoomUser,
  ICreateRoomInput,
  IJoinRoomInput,
  ILeaveRoomInput,
} from '../types/IRoom';

export class WSRoom {
  id: string;

  name: string;

  capacity: number;

  mapSize: number;

  shipsAmount: number;

  shootPerTurn: number;

  secondsPerTurn: number;

  password?: string;

  players: IRoomUser[];

  constructor(param: ICreateRoomInput) {
    this.id = uuid();
    this.name = param.name;
    this.mapSize = param.mapSize ?? 10;
    this.shipsAmount = param.shipsAmount ?? 5;
    this.shootPerTurn = param.shootPerTurn ?? 1;
    this.secondsPerTurn = param.secondsPerTurn ?? 10;
    this.capacity = param.capacity ?? 2;
    this.password = param.password;
    this.players = [];
  }

  async join(input: IJoinRoomInput) {
    if (this.players.length < this.capacity) {
      if (this.password != input.password) {
        throw new Error('Wrong password');
      }
      const player = await User.getUserById(input.playerId);
      if (player) {
        console.log(`Player ${player.pseudo} join room ${this.name} !!!!!!!`);
        const user: IRoomUser = {
          id: player.id,
          pseudo: player.pseudo,
          hasJoined: true,
        };
        this.players.push(user);
      }
    }
  }

  leave(input: ILeaveRoomInput) {
    if (this.players.length) {
      this.players = this.players.filter((p) => p.id != input.playerId);
    }
  }
}
