import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IStartPlayerInput, IPlayTurnInput } from '../types/IGame';
import { WSGame } from '../WSModels/WSGame';
import { WSRoom } from '../WSModels/WSRoom';

export default function WSGameController(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>, socket: Socket, rooms: WSRoom[], games: WSGame[]) {
  const startPlayer = (payload: IStartPlayerInput) => {
    if (!payload.boats || payload.boats.flatMap((b) => b.coordinates.filter((c) => c.x === undefined || c.y === undefined)).length || typeof payload.playerId !== 'string'  || typeof payload.roomId !== 'string') {
      socket.emit('game:startPlayer:response', {
        error: 'Missing one or severals arguments to start.',
        data: null,
      });
      return;
    }
    const room = rooms.find((r) => r.id === payload.roomId);
    if (!room) {
      socket.emit('game:startPlayer:response', {
        error: 'Room does not exist.',
        data: null,
      });
      return;
    }
    const game = games.find((g) => g.roomInformation.id === payload.roomId);
    if (game) {
      game.addPlayer(payload.playerId, payload.boats);
      if (game.roomInformation.players.length === game.roomInformation.capacity) {
        io.sockets.in(game.roomInformation.id).emit('game:startPlayer:response', { error: null, data: game });
        io.sockets.in(game.roomInformation.id).emit('game:start:response', { error: null, data: {
          playerIdToPlay: payload.playerId,
          playerIdPlayed: null,
          x: null,
          y: null,
          cellType: null,
          playerIdWin: null,
        } });
        return;
      }
      return;
    }
    if (room.players.find((p) => p.id === payload.playerId)) {
      const newGame = new WSGame(room, payload.playerId, payload.boats);
      games.push(newGame);
      socket.emit('game:startPlayer:response', { error: null, data: newGame });
      return;
    }
    socket.emit('game:startPlayer:response', {
      error: 'Player has not join the room.',
      data: null,
    });
  };

  const playTurn = (payload: IPlayTurnInput) => {
    if (typeof payload.playerId !== 'string' 
      || typeof payload.roomId !== 'string' 
      || typeof payload.x !== 'number' 
      || typeof payload.y !== 'number') {
      socket.emit('game:playTurn:response', {
        error: 'Missing one or severals arguments to play the turn.',
        data: null,
      });
      return;
    }

    const game = games.find((g) => g.roomInformation.id === payload.roomId);
    if (game) {
      io.sockets.in(game.roomInformation.id).emit('game:playTurn:response', { error: null, data: game.playTurn(payload) });
    }
  };
  
  socket.on('game:startPlayer', startPlayer);
  socket.on('game:playTurn', playTurn);
}
