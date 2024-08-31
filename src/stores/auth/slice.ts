import persistStorage from 'utils/persistStorage';
import {PayloadAction, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {loginAction, loginSocialAction, logoutAction} from './asyncThunk';

type State = {
  accessToken?: string;
  refreshToken?: string;
  isExpiredToken: boolean;
};

const initialState: State = {
  accessToken: undefined,
  refreshToken: undefined,
  isExpiredToken: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    expiredToken: (state, action: PayloadAction<boolean>) => {
      state.isExpiredToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logoutAction.fulfilled, () => {
      return initialState;
    });
    builder.addMatcher(isAnyOf(loginAction.fulfilled, loginSocialAction.fulfilled), (state, action) => {
      state.accessToken = action.payload.data?.accessToken;
      state.refreshToken = action.payload.data?.refreshToken;
    });
  },
});

export const {expiredToken} = slice.actions;

const persistConfig = {
  key: 'auth',
  storage: persistStorage,
  whitelist: ['accessToken', 'refreshToken'],
};

export default persistReducer(persistConfig, slice.reducer);
