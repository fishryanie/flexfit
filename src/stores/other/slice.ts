import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';
import persistStorage from 'utils/persistStorage';

type OtherState = Partial<{
  isReadyNavigate: boolean;
  inviteCode: string;
  deviceIp: string;
}>;

const initialState: OtherState = {
  isReadyNavigate: false,
};

const slice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    readyNavigate: (state, action: PayloadAction<OtherState['isReadyNavigate']>) => {
      state.isReadyNavigate = action.payload;
    },
    saveDeviceIp: (state, action: PayloadAction<OtherState['deviceIp']>) => {
      state.deviceIp = action.payload;
    },
    saveInviteCode: (state, action: PayloadAction<OtherState['inviteCode']>) => {
      state.inviteCode = action.payload;
    },
  },
});

export const {readyNavigate, saveDeviceIp, saveInviteCode} = slice.actions;

const persistConfig: PersistConfig<OtherState> = {
  key: 'other',
  storage: persistStorage,
  whitelist: ['inviteCode'],
};

export default persistReducer(persistConfig, slice.reducer);
