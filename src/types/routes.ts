import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = AuthStackParamList & DrawerStackParamList & CommonStackParamList;

export type BottomTabParamList = {
  BottomPremiumScreen: undefined;
  BottomPlanScreen?: undefined;
  BottomNewsFeedScreen: undefined;
  BottomStatisticalScreen?: undefined;
  BottomMessageScreen: undefined;
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
