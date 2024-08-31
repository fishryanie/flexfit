import React from 'react';
import {Icon} from 'components/base';
import {RootStackParamList} from 'types/routes';

export type DrawerListType = {
  name: string;
  icon: React.ReactElement;
  navigate?: keyof RootStackParamList;
};

export const drawerList: DrawerListType[] = [
  {
    name: 'My Profile',
    icon: <Icon type="FontAwesome5" name="user-circle" />,
    navigate: 'AccountInfoScreen',
  },
  {
    name: 'Settings',
    icon: <Icon type="Ionicons" name="settings-sharp" />,
    navigate: 'SettingScreen',
  },
  {
    name: 'Logout',
    icon: <Icon type="Ionicons" name="settings-sharp" />,
  },
];
