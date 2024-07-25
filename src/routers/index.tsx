import React, {useCallback} from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';
import {readyNavigate} from 'stores/other/slice';
import {useAppDispatch} from 'hooks/redux';
import {useFCMToken} from 'hooks/common';
import {Drawer} from 'components/drawer';
import GroupDrawer from './drawer';
import Bottom from './Bottom';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const dispatch = useAppDispatch();

  const handleReadyNavigation = () => {
    dispatch(readyNavigate(true));
  };

  useFCMToken();

  const DrawerWrapper = useCallback(() => {
    return (
      <Drawer>
        <Bottom />
      </Drawer>
    );
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onReady={handleReadyNavigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerWrapper" component={DrawerWrapper} />
        {GroupDrawer()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
