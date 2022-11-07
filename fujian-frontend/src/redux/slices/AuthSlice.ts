import { createSlice } from '@reduxjs/toolkit';
import SignUpAction from '../actions/auth/SignUp';
import SignInAction from '../actions/auth/SignIn';
import { GetTokenCookie, UnsetTokenCookie } from '../../utils/Token';
import { GetUserCookie, UnsetUserCookie } from '../../utils/User';
import IAuthState from '../types/IAuth';

const initialState: IAuthState = {
  isLoggedIn: !!GetTokenCookie(),
  isLoading: false,
  isError: false,
  user: GetTokenCookie() ? GetUserCookie() : undefined,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    signout: () => {
      UnsetTokenCookie();
      UnsetUserCookie();
      return {
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        user: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignUpAction.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(SignUpAction.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      user: action.payload.data.user,
    }));
    builder.addCase(SignUpAction.rejected, (state) => ({
      ...state,
      isLoading: false,
      isError: true,
    }));
    builder.addCase(SignInAction.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(SignInAction.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      user: action.payload.data.user,
    }));
    builder.addCase(SignInAction.rejected, (state) => ({
      ...state,
      isLoading: false,
      isError: true,
    }));
  },
});

export const { signout } = AuthSlice.actions;

export default AuthSlice.reducer;
