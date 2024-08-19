import React, {ReactElement, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabParamList} from 'types/routes';
import {hs} from 'themes/helper';
import {COLORS} from 'themes/color';
import HomeScreen from 'screens/bottom/HomeScreen';
import {ICONS} from 'assets';
import {Image} from 'react-native';
// import PlanScreen from 'screens/bottom/PlanScreen';

type TypeDataActivityBookingTap = {
  label: string;
  name: keyof BottomTabParamList;
  screen: () => ReactElement;
  icon: string;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Bottom() {
  const {bottom} = useSafeAreaInsets();
  const renderIcon = useCallback((props: {focused: boolean; color: string; size: number}, icon: string) => {
    return (
      <Image
        source={{uri: icon}}
        width={hs(props.focused ? props.size + 2 : props.size)}
        height={hs(props.focused ? props.size + 2 : props.size)}
        resizeMode="contain"
        tintColor={props.color}
      />
    );
  }, []);

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="BottomStatisticalScreen"
      screenOptions={() => ({headerShown: false})}>
      {data.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.screen}
          options={{
            tabBarStyle: {paddingBottom: hs(bottom + 12), height: hs(bottom + 72)},
            tabBarActiveTintColor: COLORS.textPrimary,
            tabBarInactiveTintColor: COLORS.textPlaceholder,
            tabBarLabelStyle: {fontSize: hs(12)},
            tabBarLabel: item.label,
            tabBarIcon: props => renderIcon(props, item.icon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const data: TypeDataActivityBookingTap[] = [
  {
    screen: HomeScreen,
    label: 'News Feed',
    name: 'BottomNewsFeedScreen',
    icon: ICONS.ic_bottomNewsFeed,
  },
  {
    screen: HomeScreen,
    label: 'Plan',
    name: 'BottomPlanScreen',
    icon: ICONS.ic_bottomPlan,
  },
  {
    screen: HomeScreen,
    label: 'Statistical',
    name: 'BottomStatisticalScreen',
    icon: ICONS.ic_bottomStatistical,
  },
  {
    screen: HomeScreen,
    label: 'Message',
    name: 'BottomMessageScreen',
    icon: ICONS.ic_bottomMessage,
  },
  {
    screen: HomeScreen,
    label: 'Premium',
    name: 'BottomPremiumScreen',
    icon: ICONS.ic_bottomPremium,
  },
];
