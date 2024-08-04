import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = AuthStackParamList & DrawerStackParamList & CommonStackParamList;

export type BottomTabParamList = {
  BottomHomeScreen: undefined;
  BottomPlanScreen?: undefined;
  BottomNotifyScreen: undefined;
  BottomOrderScreen?: undefined;
  BottomProfileScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
};

export type DrawerStackParamList = {
  SettingScreen: undefined;
  AccountInfoScreen: undefined;
};

export type CommonStackParamList = {
  DrawerWrapper: undefined;
};
