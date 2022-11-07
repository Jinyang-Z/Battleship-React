import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import thunk from 'redux-thunk';

import AuthReducer from './slices/AuthSlice';
import MessageReducer from './slices/MessageSlice';
import GameReducer from './slices/GameSlice';
import BoardReducer from './slices/BoardSlice';
import RoomReducer from './slices/RoomSlice';
import RoomsReducer from './slices/RoomsSlice';

import RoomMiddleware from '../middlewares/RoomMiddleware';
import RoomsMiddleware from '../middlewares/RoomsMiddleware';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth'],
};

const reducers = combineReducers({
  auth: AuthReducer,
  message: MessageReducer,
  game: GameReducer,
  board: BoardReducer,
  room: RoomReducer,
  rooms: RoomsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([thunk, RoomMiddleware, RoomsMiddleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
