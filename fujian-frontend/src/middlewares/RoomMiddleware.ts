import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import {
  startConnecting,
  connectionEstablished,
  createRoom,
  updateRoom,
  joinRoom,
  leaveRoom,
  setIsLoading,
  setIsError,
  joinRoomResponse,
  roomIsFull,
} from '../redux/slices/RoomSlice';
import { setMessage } from '../redux/slices/MessageSlice';
import IRoom, { IJoinRoomOutput } from '../redux/types/IRoom';
import { ISocketResponse } from '../redux/types/ISocketResponse';
import { IGameResponse, IGameInfoResponse } from '../redux/types/IGame';
import { GetTokenCookie } from '../utils/Token';
import {
  gameStartResponse,
  playTurn,
  playTurnResponse,
  startPlayer,
  startPlayerResponse,
  resetBoard,
} from '../redux/slices/BoardSlice';

import {
  updateIsReadyStatus,
  updateTurn,
  setWinner,
  resetGame,
} from '../redux/slices/GameSlice';

const RoomMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const isConnectionEstablished = store.getState().room.isConnected;
    const { isWaitingForOtherPlayer } = store.getState().room;
    const { isWaitingGameStart } = store.getState().room;
    if (startConnecting.match(action)) {
      const url = process.env.REACT_APP_ENVIRONNEMENT === 'prod'
        ? process.env.REACT_APP_PRODUCTION_SOCKET_URL
        : process.env.REACT_APP_SOCKET_URL;
      socket = io(url as string, {
        auth: { token: GetTokenCookie() },
      });

      socket.on('connect', () => {
        store.dispatch(connectionEstablished());
      });
    }

    if (isConnectionEstablished && createRoom.match(action)) {
      store.dispatch(setIsLoading(true));
      socket.emit('room:createRoom', action.payload);
      socket.on(
        'room:createRoom:response',
        (response: ISocketResponse<IRoom>) => {
          if (response.error) {
            store.dispatch(
              setMessage(
                `Room created failed ! ServerMessage: ${response.error}`,
              ),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error('Room creation failed');
          }
          store.dispatch(updateRoom(response.data));
          store.dispatch(setMessage('Room created successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }

    if (isConnectionEstablished && joinRoom.match(action)) {
      store.dispatch(setIsLoading(true));
      socket.emit('room:joinRoom', action.payload);
      socket.on(
        'room:joinRoom:response',
        (response: ISocketResponse<IJoinRoomOutput>) => {
          if (response.error) {
            store.dispatch(
              setMessage(
                `Room joined failed ! ServerMessage: ${response.error}`,
              ),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Room joined failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(updateRoom(response.data.room));
          store.dispatch(joinRoomResponse(response.data));
          store.dispatch(roomIsFull());
          store.dispatch(setMessage('Room joined successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }

    if (leaveRoom.match(action)) {
      store.dispatch(setIsLoading(true));
      socket.emit('room:leaveRoom', action.payload);
      socket.on(
        'room:leaveRoom:response',
        (response: ISocketResponse<IRoom>) => {
          if (response.error) {
            store.dispatch(
              setMessage(`Room left failed ! ServerMessage: ${response.error}`),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Room left failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(updateRoom(response.data));
          store.dispatch(setMessage('Room left successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }

    if (isConnectionEstablished && startPlayer.match(action)) {
      store.dispatch(setIsLoading(true));
      socket.emit('game:startPlayer', action.payload);
      socket.on(
        'game:startPlayer:response',
        (response: ISocketResponse<IGameInfoResponse>) => {
          if (response.error) {
            store.dispatch(
              setMessage(
                `Start player failed ! ServerMessage: ${response.error}`,
              ),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Start player failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(startPlayerResponse(response.data));
          store.dispatch(updateIsReadyStatus(response.data));
          store.dispatch(setMessage('Start player successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }

    if (isConnectionEstablished && playTurn.match(action)) {
      store.dispatch(setIsLoading(true));
      socket.emit('game:playTurn', action.payload);
      socket.on(
        'game:playTurn:response',
        (response: ISocketResponse<IGameResponse>) => {
          if (response.error) {
            store.dispatch(
              setMessage(`Play turn failed ! ServerMessage: ${response.error}`),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Play turn failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(playTurnResponse(response.data));
          store.dispatch(setMessage('Play turn successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }

    if (isConnectionEstablished) {
      if (isWaitingForOtherPlayer) {
        socket.on(
          'room:joinRoom:response',
          (response: ISocketResponse<IJoinRoomOutput>) => {
            if (response.error) {
              store.dispatch(
                setMessage(
                  `Room joined failed ! ServerMessage: ${response.error}`,
                ),
              );
              store.dispatch(setIsError(true));
              store.dispatch(setIsLoading(false));
              throw new Error(
                `Room joined failed. ServerMessage: ${response.error}`,
              );
            }
            store.dispatch(updateRoom(response.data.room));
            store.dispatch(joinRoomResponse(response.data));
            store.dispatch(roomIsFull());
            store.dispatch(setMessage('Room joined successfully !'));
            store.dispatch(setIsLoading(false));
          },
        );
      }
      if (isWaitingGameStart) {
        socket.on(
          'game:start:response',
          (response: ISocketResponse<IGameResponse>) => {
            if (response.error) {
              store.dispatch(
                setMessage(
                  `Game Start failed ! ServerMessage: ${response.error}`,
                ),
              );
              store.dispatch(setIsError(true));
              store.dispatch(setIsLoading(false));
              throw new Error(
                `Game Start failed. ServerMessage: ${response.error}`,
              );
            }
            store.dispatch(gameStartResponse(response.data));
            store.dispatch(updateTurn(response.data));
            store.dispatch(setMessage('Game Start successfully !'));
            store.dispatch(setIsLoading(false));
          },
        );
      }
      socket.on(
        'game:startPlayer:response',
        (response: ISocketResponse<IGameInfoResponse>) => {
          if (response.error) {
            store.dispatch(
              setMessage(
                `Start player failed ! ServerMessage: ${response.error}`,
              ),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Start player failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(startPlayerResponse(response.data));
          store.dispatch(updateIsReadyStatus(response.data));
          store.dispatch(setMessage('Start player successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
      socket.on(
        'room:leaveRoom:response',
        (response: ISocketResponse<IRoom>) => {
          if (response.error) {
            store.dispatch(
              setMessage(`Room left failed ! ServerMessage: ${response.error}`),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Room left failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(updateRoom(response.data));
          store.dispatch(resetBoard());
          store.dispatch(resetGame());
          store.dispatch(setMessage('Room left successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
      socket.on(
        'game:playTurn:response',
        (response: ISocketResponse<IGameResponse>) => {
          if (response.error) {
            console.log('ERROR: RoomMiddleWare - playTurn');
            store.dispatch(
              setMessage(`Play turn failed ! ServerMessage: ${response.error}`),
            );
            store.dispatch(setIsError(true));
            store.dispatch(setIsLoading(false));
            throw new Error(
              `Play turn failed. ServerMessage: ${response.error}`,
            );
          }
          store.dispatch(playTurnResponse(response.data));
          store.dispatch(updateTurn(response.data));
          if (response.data.playerIdWin) {
            store.dispatch(setWinner(response.data.playerIdWin));
          }
          store.dispatch(setMessage('Play turn successfully !'));
          store.dispatch(setIsLoading(false));
        },
      );
    }
    next(action);
  };
};

export default RoomMiddleware;
