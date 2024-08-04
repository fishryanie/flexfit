import React, {useCallback, useEffect} from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';
import {readyNavigate} from 'stores/other/slice';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useFCMToken} from 'hooks/common';
import {Drawer} from 'components/drawer';
import GroupDrawer from './drawer';
import Bottom from './Bottom';
import AuthGroup from './Auth';
import i18n from 'i18n';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const language = useAppSelector(state => state.app.language);
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

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <NavigationContainer ref={navigationRef} onReady={handleReadyNavigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {AuthGroup()} */}
        <Stack.Screen name="DrawerWrapper" component={DrawerWrapper} />
        {/* {GroupDrawer()} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
