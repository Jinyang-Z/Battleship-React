import Cookies from 'universal-cookie';
import IRoom from '../redux/types/IRoom';

export const SetRoomCookie = (room: IRoom) => {
  const cookies = new Cookies();
  cookies.set('room', room, { path: '/' });
};

export const UnsetRoomCookie = () => {
  const cookies = new Cookies();
  cookies.remove('room');
};

export const GetRoomCookie = () => {
  const cookies = new Cookies();
  return cookies.get('room');
};
