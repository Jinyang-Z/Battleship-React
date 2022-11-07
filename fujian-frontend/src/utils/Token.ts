import Cookies from 'universal-cookie';

export const SetTokenCookie = (token: string) => {
  const cookies = new Cookies();
  cookies.set('token', token, { path: '/' });
};

export const UnsetTokenCookie = () => {
  const cookies = new Cookies();
  cookies.remove('token');
};

export const GetTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get('token');
};
