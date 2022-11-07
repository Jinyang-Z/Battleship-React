import { Server, Socket } from 'socket.io'; 
import {
  ICreateRoomInput,
  IJoinRoomInput,
  IJoinRoomOutput,
  ILeaveRoomInput,
} from '../types/IRoom';
import User from '../db/models/UserModel';
import { WSRoom } from '../WSModels/WSRoom';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default function WSRoomController(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>,
  socket: Socket, rooms: WSRoom[]) {
  const listRoom = () => {
    socket.emit('room:list:response', { error: null, data: rooms });
  };

  const checkPlayerInRoom = (id: string, functionName: string) => {
    const room = rooms.find((r) => r.players.find((p) => p.id === id));
    if (room) {
      socket.emit(functionName, { error: 'Player already in room', data: null });
      return true;
    }
    return false;
  };

  const createRoom = async (payload: ICreateRoomInput) => {
    if (typeof payload.capacity !== 'number' || typeof payload.mapSize !== 'number' || typeof payload.name !== 'string' 
    || typeof payload.secondsPerTurn !== 'number' || typeof payload.shipsAmount !== 'number' || typeof payload.shootPerTurn !== 'number'
    || typeof payload.userId !== 'string') {
      socket.emit('room:createRoom:response', { error: 'Missing one argument to create a room.', data: null });
      return;
    }
    console.log(`Creating room ${payload.name}`);
    try {
      const user = socket.data.user as User;
      if (user) {
        if (checkPlayerInRoom(user.id, 'room:createRoom:response')) {
          return;
        }
        const room = new WSRoom(payload);
        if (room) {
          await room.join({
            roomId: room.id,
            playerId: user.id,
            password: room.password,
          });
          await socket.join(room.id);
          rooms.push(room);
          socket.emit('room:createRoom:response', { error: null, data: room });
        }
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const joinRoom = async (payload: IJoinRoomInput) => {
    if (typeof payload.playerId !== 'string' || typeof payload.roomId !== 'string') {
      socket.emit('room:joinRoom:response', { error: 'Missing one of severals arguments for joining a room.', data: null });
      return;
    }
    try {
      const user = socket.data.user as User;
      if (!user) {
        return;
      }
      if (checkPlayerInRoom(user.id, 'room:joinRoom:response')) {
        return;
      }
      const room = rooms.find((r) => r.id === payload.roomId);
      if (room) {
        console.log(`Room ${room.name} finded`);
        if (room.players.find((p) => p.id === payload.playerId)) {
          socket.emit('room:joinRoom:response', { error: 'You are already in this room.', data: null });
          return;
        }
        await room.join(payload);
        await socket.join(room.id);
        console.log('room player after join : ', room.players);
        io.sockets.in(room.id).emit('room:joinRoom:response', { error: null, data:  {
          player: {
            hasJoined: true,
            id: user.id,
            pseudo: user.pseudo,
          },
          room,
          password: room.password,
        } as IJoinRoomOutput });
        return;
      }
      socket.emit('room:joinRoom:response', { error: `${room.name} does not exists.`, data: null });
    } catch (error) {
      console.error((error as Error).stack);
    }
  };

  const leaveRoom = async (payload: ILeaveRoomInput) => {
    if (typeof payload.roomId !== 'string' || typeof payload.playerId !== 'string') {
      socket.emit('room:leaveRoom:response', { error: 'Missing one of severals arguments for leaving this room.', data: null });
      return;
    }
    const room = rooms.find((r) => r.id === payload.roomId);
    if (room) {
      console.log(`Leaving ${room.name} room`);
      room.leave(payload);
      await socket.leave(room.id);
      rooms.splice(rooms.findIndex((r) => r.id === payload.roomId), 1);
      io.sockets.in(room.id).emit('room:leaveRoom:response', room);
    }
  };

  socket.on('room:list', listRoom);
  socket.on('room:createRoom', createRoom);
  socket.on('room:joinRoom', joinRoom);
  socket.on('room:leaveRoom', leaveRoom);
}
