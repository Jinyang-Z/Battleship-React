import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import {
  startConnecting,
  connectionEstablished,
  getRooms,
  setIsLoading,
  setIsError,
} from '../redux/slices/RoomsSlice';
import { setMessage } from '../redux/slices/MessageSlice';
import IRoom from '../redux/types/IRoom';
import { ISocketResponse } from '../redux/types/ISocketResponse';
import { GetTokenCookie } from '../utils/Token';

const RoomsMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
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

      store.dispatch(setIsLoading(true));
      socket.emit('room:list');
      socket.on('room:list:response', (response: ISocketResponse<IRoom[]>) => {
        if (response.error) {
          store.dispatch(setIsError(true));
          store.dispatch(setIsLoading(false));
          store.dispatch(
            setMessage(
              `Get created room failed ! ServerMessage: ${response.error}`,
            ),
          );
          throw new Error(
            `Get created room failed ServerMessage: ${response.error}`,
          );
        }
        store.dispatch(getRooms({ rooms: response.data as IRoom[] }));
        store.dispatch(setMessage('Get created rooms successfully !'));
        store.dispatch(setIsLoading(false));
      });
    }

    next(action);
  };
};

export default RoomsMiddleware;
