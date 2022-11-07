import Cookies from 'universal-cookie';
import IUser from '../redux/types/IUser';

export const SetUserCookie = (user: IUser) => {
  const cookies = new Cookies();
  cookies.set('user', JSON.stringify(user), { path: '/' });
};

export const UnsetUserCookie = () => {
  const cookies = new Cookies();
  cookies.remove('user');
};

export const GetUserCookie = (): IUser => {
  const cookies = new Cookies();
  return cookies.get('user');
};
