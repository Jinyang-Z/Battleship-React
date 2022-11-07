import axios from '../config/Axios';
import IBase from '../redux/types/IBase';
import IUser from '../redux/types/IUser';

export interface ISignUpInput {
  email: string;
  pseudo: string;
  password: string;
}

export interface ISignUpOutput extends IBase {
  data: {
    user: IUser;
    token: string;
  }
}

export const SignUp = async ({ pseudo, email, password }: ISignUpInput) => {
  const response = await axios.post<ISignUpOutput>('/user/sign-up', {
    pseudo,
    email,
    password,
  });
  return response.data;
};
