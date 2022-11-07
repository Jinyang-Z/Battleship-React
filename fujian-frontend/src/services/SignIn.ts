import axios from '../config/Axios';
import IUser from '../redux/types/IUser';

export interface ISignInInput {
  email: string;
  password: string;
}

export interface ISignInOutput {
  data: {
    user: IUser;
    token: string;
  }
}

export const SignIn = async ({ email, password }: ISignInInput) => {
  const response = await axios.post<ISignInOutput>('/user/sign-in', {
    email,
    password,
  });
  return response.data;
};
