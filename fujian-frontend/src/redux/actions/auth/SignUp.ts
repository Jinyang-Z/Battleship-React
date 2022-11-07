import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SetTokenCookie } from '../../../utils/Token';
import { SetUserCookie } from '../../../utils/User';
import { ISignUpInput, SignUp } from '../../../services/SignUp';
import { setMessage } from '../../slices/MessageSlice';

const SignUpAction = createAsyncThunk(
  'Auth/SignUp',
  async (input: ISignUpInput, thunkApi) => {
    try {
      const data = await SignUp(input);
      thunkApi.dispatch(setMessage('Signed up successfully !'));
      SetTokenCookie(data.data.token);
      SetUserCookie(data.data.user);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        thunkApi.dispatch(setMessage(err.response?.data.message));
        return thunkApi.rejectWithValue(err.response?.status);
      }
      thunkApi.dispatch(setMessage('An unexpected error occurred'));
      return thunkApi.rejectWithValue(500);
    }
  },
);

export default SignUpAction;
