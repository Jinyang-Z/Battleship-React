import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SetTokenCookie } from '../../../utils/Token';
import { SetUserCookie } from '../../../utils/User';
import { ISignInInput, SignIn } from '../../../services/SignIn';
import { setMessage } from '../../slices/MessageSlice';

const SignInAction = createAsyncThunk(
  'Auth/SignIn',
  async (input: ISignInInput, thunkApi) => {
    try {
      const data = await SignIn(input);
      thunkApi.dispatch(setMessage('Successfully login !'));
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

export default SignInAction;
