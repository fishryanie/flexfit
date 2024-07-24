import React, {ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabParamList} from 'types/routes';
import {hs} from 'themes/helper';
import {COLORS} from 'themes/color';
import {Icon} from 'components/base';
import HomeScreen from 'screens/bottom/HomeScreen';

type TypeDataActivityBookingTap = {
  label: string;
  name: keyof BottomTabParamList;
  screen: () => ReactElement;
  icon: (props: {focused: boolean; color: string; size: number}) => ReactElement;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Bottom() {
  const {bottom} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="BottomHomeScreen"
      backBehavior="initialRoute"
      screenOptions={() => ({headerShown: false})}>
      {data.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.screen}
          options={{
            tabBarStyle: {paddingBottom: hs(bottom + 12), height: hs(bottom + 72)},
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textPlaceholder,
            tabBarLabelStyle: {fontSize: hs(12)},
            tabBarLabel: item.label,
            tabBarIcon: item.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const data: TypeDataActivityBookingTap[] = [
  {
    name: 'BottomHomeScreen',
    label: 'bottom.home',
    screen: HomeScreen,
    icon: ({color}) => <Icon type="FontAwesome5" name="user-circle" color={color} />,
  },
];
