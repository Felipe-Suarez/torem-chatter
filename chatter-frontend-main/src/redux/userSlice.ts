import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { GetUserDataType, UserDataState } from '../types/chat';
import { SERVER_URL } from '../config/vars';

const initialState: UserDataState = {
  name: '',
  lastName: '',
  email: '',
  photo: '',
  userId: '',
  authToken: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLoginData: (state, action: PayloadAction<UserDataState>) => {
      state.userId = action.payload.userId;
      state.authToken = action.payload.authToken;
    },
    setUserData: (state, action: PayloadAction<GetUserDataType>) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.photo = `${SERVER_URL}/${action.payload.image}`;
    },
    setLogoutData: (state) => {
      state.name = '';
      state.lastName = '';
      state.email = '';
      state.photo = '';
      state.userId = '';
      state.authToken = '';
    }
  }
});

export const { setUserName, setLoginData, setUserData, setLogoutData } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
