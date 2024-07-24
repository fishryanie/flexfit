import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

// export type StoriesDetailScreenProps = RootStackScreenProps<'StoriesDetailScreen'>;

export type RootStackParamList = {
  HomeScreen: undefined;
};
