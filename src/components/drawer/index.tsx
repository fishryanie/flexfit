import React, {Fragment, useEffect, useState} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Block, Icon, Pressable, Text} from 'components/base';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {RootStackParamList} from 'types/routes';
import {navigationRef} from 'routers';
import {COLORS} from 'themes/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonDarkMode} from 'components/common';
import {useColorScheme} from 'react-native';

type DrawerListType = {
  name: string;
  icon: React.ReactElement;
  navigate: keyof RootStackParamList;
};

type DrawerProps = {
  children: React.ReactElement;
};

export const Drawer = ({children}: DrawerProps) => {
  const {top} = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const active = useSharedValue(false);
  const [theme, setTheme] = useState<string | null | undefined>(colorScheme);
  const [themeSwitch, setThemeSwitch] = useState<string>('system');

  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0);
  });

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      zIndex: -9999,
      ...DEFAULT_STYLES.absoluteFillObject,
      backgroundColor: theme === 'dark' ? withTiming(COLORS.primary) : withTiming('white'),
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      ...DEFAULT_STYLES.absoluteFillObject,
      display: active.value ? 'flex' : 'none',
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(progress.value, [0, 1], [0, -15], Extrapolation.CLAMP);
    return {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: '#1d2733',
      borderRadius: active.value ? withTiming(28) : withTiming(0),
      transform: [
        {perspective: 1000},
        {rotateY: `${rotateY}deg`},
        {scale: active.value ? withTiming(0.8) : withTiming(1)},
        {translateX: active.value ? withSpring(240) : withTiming(0)},
      ],
    };
  });

  const closeDrawerHandler = () => {
    active.value = false;
  };
  const menuPress = (item: DrawerListType) => {
    closeDrawerHandler();
    navigationRef.navigate(item.navigate as keyof RootStackParamList);
  };

  useEffect(() => {
    if (themeSwitch === 'system') {
      setTheme(colorScheme);
    }
  }, [colorScheme, themeSwitch]);

  return (
    <Fragment>
      <Animated.View style={animatedContainerStyle}>
        {/* <Block gap={10} paddingTop={top + 12} paddingHorizontal={15} backgroundColor={COLORS.white}>
          <Text fontSize={16}>Hi Flexfit 👋 </Text>
          <Text
            fontSize={35}
            fontWeight={700}
            color={COLORS.primary}
            style={{letterSpacing: 1}}
            onPress={() => {
              active.value = true;
            }}>
            Menu
          </Text>
        </Block> */}
        {children}
        <Animated.View style={animatedOverlayStyle}>
          <Pressable absoluteFillObject onPress={closeDrawerHandler} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={backgroundColorAnimation}>
        <Block maxWidth={180} paddingTop={120} paddingHorizontal={30}>
          <Block gap={14} marginBottom={12} paddingBottom={14} borderBottomWidth={1}>
            <Text fontWeight="bold" color="white" fontSize={22}>
              Rakha Wibowo
            </Text>
          </Block>
          {drawerList.map((item, index) => (
            <Pressable key={index} rowCenter paddingVertical={16} onPress={() => menuPress(item)}>
              <Text fontWeight="bold" fontSize={16} color="white">
                {item.name}
              </Text>
            </Pressable>
          ))}
          <ButtonDarkMode setTheme={setTheme} theme={theme} setThemeSwitch={setThemeSwitch} themeSwitch={themeSwitch} />
        </Block>
      </Animated.View>
    </Fragment>
  );
};

const drawerList: DrawerListType[] = [
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
];
