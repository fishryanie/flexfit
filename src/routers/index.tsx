import React from 'react';
import bottom from 'screens/bottom';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const handleReadyNavigation = () => {};
  return (
    <NavigationContainer ref={navigationRef} onReady={handleReadyNavigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={bottom.HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
