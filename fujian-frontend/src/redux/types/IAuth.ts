import IUser from './IUser';

export default interface IAuth {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  user?: IUser;
}
