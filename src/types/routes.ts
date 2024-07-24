import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

// export type StoriesDetailScreenProps = RootStackScreenProps<'StoriesDetailScreen'>;

export type BottomTabParamList = {
  BottomHomeScreen: undefined;
  BottomProductScreen?: undefined;
  BottomNotifyScreen: undefined;
  BottomOrderScreen?: undefined;
  BottomProfileScreen: undefined;
};

export type RootStackParamList = {
  HomeScreen: undefined;

  SettingScreen: undefined;
  AccountInfoScreen: undefined;
};
