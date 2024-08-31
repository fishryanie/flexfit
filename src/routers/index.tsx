import i18n from 'i18n';
import React, {useCallback, useEffect} from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';
import {readyNavigate} from 'stores/other/slice';
import {termsPolicyAction} from 'stores/common/asyncThunk';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useNotificationPermission} from 'hooks/permissions';
import {getUser} from 'stores/user/asyncThunk';
import {useFCMToken} from 'hooks/common';
import {Drawer} from 'components/drawer';
import Bottom from './Bottom';
import AuthGroup from './Auth';
import GroupDrawer from './drawer';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const language = useAppSelector(state => state.app.language);
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const dispatch = useAppDispatch();

  const handleReadyNavigation = () => dispatch(readyNavigate(true));

  useEffect(() => {
    dispatch(termsPolicyAction());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch, accessToken]);

  useFCMToken();
  useNotificationPermission();

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
        {!accessToken && AuthGroup()}
        {!!accessToken && <Stack.Screen name="DrawerWrapper" component={DrawerWrapper} />}
        {!!accessToken && GroupDrawer()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
