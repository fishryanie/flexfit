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
import {onToggleDrawer, onToggleSelectCodePush} from 'stores/app/slice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {Block, Pressable, Text} from 'components/base';
import {DEFAULT_STYLES} from 'themes/defaultStyles';
import {RootStackParamList} from 'types/routes';
import {ButtonDarkMode} from 'components/common';
import {useColorScheme} from 'react-native';
import {displayVersion} from 'utils/helper';
import {navigationRef} from 'routers';
import {COLORS} from 'themes/color';
import {width} from 'themes/helper';
import {DrawerListType, drawerList} from './data';
import {useLogout} from 'stores/auth/apiHooks';

type DrawerProps = {
  children: React.ReactElement;
};

export const Drawer = ({children}: DrawerProps) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const active = useSharedValue(false);
  const isShowDrawer = useAppSelector(state => state.app.isShowDrawer);
  const insets = useSafeAreaInsets();
  const {request: requestSignOut} = useLogout();
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
        {scale: active.value ? withTiming(0.7) : withTiming(1)},
        {translateX: active.value ? withSpring(width * 0.8) : withTiming(0)},
      ],
    };
  });

  const closeDrawerHandler = () => {
    active.value = false;
    dispatch(onToggleDrawer(false));
  };

  const menuPress = (item: DrawerListType) => {
    closeDrawerHandler();
    if (item.name === 'Logout') {
      return requestSignOut();
    }
    navigationRef.navigate(item.navigate as keyof RootStackParamList);
  };

  useEffect(() => {
    if (themeSwitch === 'system') {
      setTheme(colorScheme);
    }
  }, [colorScheme, themeSwitch]);

  useEffect(() => {
    active.value = isShowDrawer;
  }, [isShowDrawer, active]);

  return (
    <Fragment>
      <Animated.View style={animatedContainerStyle}>
        {children}
        <Animated.View style={animatedOverlayStyle}>
          <Pressable absoluteFillObject onPress={closeDrawerHandler} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={backgroundColorAnimation}>
        <Block flex maxWidth={180} paddingTop={120} paddingHorizontal={30}>
          <Block gap={14} marginBottom={12} paddingBottom={14} borderBottomWidth={1}>
            <Text fontWeight="bold" color="white" fontSize={22}>
              Rakha Wibowo
            </Text>
          </Block>
          {drawerList.map((item, index) => (
            <Pressable key={index} gap={12} rowCenter paddingVertical={16} onPress={() => menuPress(item)}>
              {item.icon}
              <Text fontWeight="bold" fontSize={16} color="white">
                {item.name}
              </Text>
            </Pressable>
          ))}

          <ButtonDarkMode setTheme={setTheme} theme={theme} setThemeSwitch={setThemeSwitch} themeSwitch={themeSwitch} />
        </Block>
        <Text
          right={30}
          fontSize={12}
          position="absolute"
          fontWeight="light"
          bottom={insets.bottom + 12 || 12}
          onLongPress={() => dispatch(onToggleSelectCodePush(true))}>
          {displayVersion()}
        </Text>
      </Animated.View>
    </Fragment>
  );
};
