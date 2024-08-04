import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Appearance, ColorSchemeName} from 'react-native';
import {PersistConfig, persistReducer} from 'redux-persist';
import persistStorage from 'utils/persistStorage';

type AppState = {
  isShowDrawer: boolean;
  isReadyNavigate: boolean;
  isShowSelectCodePush: boolean;
  colorScheme: ColorSchemeName;
  language: 'vi' | 'en';
};

const initialState: AppState = {
  isShowDrawer: false,
  isReadyNavigate: false,
  isShowSelectCodePush: false,
  colorScheme: Appearance.getColorScheme(),
  language: 'vi',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    onReadyNavigate: (state, action: PayloadAction<AppState['isReadyNavigate']>) => {
      state.isReadyNavigate = action.payload;
    },
    onToggleDrawer: (state, action: PayloadAction<AppState['isShowDrawer']>) => {
      state.isShowDrawer = action.payload;
    },
    onToggleLanguage: (state, action: PayloadAction<AppState['language']>) => {
      state.language = action.payload;
    },
    onToggleColorMode: (state, action: PayloadAction<AppState['colorScheme']>) => {
      state.colorScheme = action.payload;
    },
    onToggleSelectCodePush: (state, action: PayloadAction<AppState['isShowSelectCodePush']>) => {
      state.isShowSelectCodePush = action.payload;
    },
  },
});

export const {onReadyNavigate, onToggleDrawer, onToggleSelectCodePush, onToggleColorMode} = slice.actions;

const persistConfig: PersistConfig<AppState> = {
  key: 'app',
  storage: persistStorage,
  whitelist: ['colorScheme'],
};

export default persistReducer(persistConfig, slice.reducer);
