import React from 'react';
import drawer from 'screens/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GroupDrawer() {
  return (
    <Stack.Group>
      <Stack.Screen name="SettingScreen" component={drawer.SettingScreen} />
      <Stack.Screen name="AccountInfoScreen" component={drawer.AccountInfoScreen} />
    </Stack.Group>
  );
}
