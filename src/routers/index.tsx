import React from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';
import {Drawer} from 'components/drawer';
import {useAppDispatch} from 'hooks/redux';
import {readyNavigate} from 'stores/other/slice';
import {useFCMToken} from 'hooks/common';
import Bottom from './bottom';
import GroupDrawer from './drawer';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const dispatch = useAppDispatch();

  const handleReadyNavigation = () => {
    // dispatch(readyNavigate(true));
  };

  useFCMToken();

  return (
    <NavigationContainer ref={navigationRef} onReady={handleReadyNavigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Drawer>
          <Bottom />
        </Drawer>
        <GroupDrawer />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
