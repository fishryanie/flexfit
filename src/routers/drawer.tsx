import React from 'react';
import drawer from 'screens/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DrawerStackParamList} from 'types/routes';

const Stack = createNativeStackNavigator<DrawerStackParamList>();

export default function GroupDrawer() {
  return (
    <Stack.Group>
      <Stack.Screen name="SettingScreen" component={drawer.SettingScreen} />
      <Stack.Screen name="AccountInfoScreen" component={drawer.AccountInfoScreen} />
    </Stack.Group>
  );
}
