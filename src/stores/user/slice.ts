import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {DefaultState, defaultState} from 'types/redux';
import {UserInfo} from 'types/user';
import {getUser} from './asyncThunk';
import persistStorage from 'utils/persistStorage';

type State = {
  userInfo: DefaultState<UserInfo>;
};

const initialState: State = {
  userInfo: defaultState,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.userInfo = defaultState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.userInfo.isLoading = true;
        state.userInfo.error = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.data = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userInfo.isLoading = false;
        state.userInfo.error = action.payload || action.error;
      });
  },
});

export const {clearUser} = slice.actions;

const persistConfig = {
  key: 'user',
  storage: persistStorage,
  whitelist: ['userInfo'],
};

export default persistReducer(persistConfig, slice.reducer);
