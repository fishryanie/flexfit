import React, {Fragment} from 'react';
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

type DrawerListType = {
  name: string;
  icon: React.ReactElement;
  navigate: string;
};

type DrawerProps = {
  children: React.ReactElement;
};

export const Drawer: React.FC<DrawerProps> = ({children}) => {
  const active = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0);
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

  return (
    <Fragment>
      <Animated.View style={animatedContainerStyle}>
        {children}
        <Animated.View style={animatedOverlayStyle}>
          <Pressable absoluteFillObject onPress={closeDrawerHandler} />
        </Animated.View>
      </Animated.View>
      <Block absoluteFillObject zIndex={-9999} backgroundColor={COLORS.antiFlashWhite}>
        <Block maxWidth={180} paddingTop={120} paddingHorizontal={30}>
          <Block gap={14} marginBottom={12} paddingBottom={14} borderBottomWidth={1}>
            <Text fontWeight="bold" color="white" fontSize={22}>
              Rakha Wibowo
            </Text>
          </Block>
          {drawerList.map((item, index) => (
            <Pressable key={index} rowCenter paddingVertical={16} onPress={() => menuPress(item)}>
              <Text fontWeight="bold" fontSize={16}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </Block>
      </Block>
    </Fragment>
  );
};

const drawerList: DrawerListType[] = [
  {
    name: 'My Profile',
    icon: <Icon type="FontAwesome5" name="user-circle" />,
    navigate: 'MyProfile',
  },
  {
    name: 'Settings',
    icon: <Icon type="Ionicons" name="settings-sharp" />,
    navigate: 'Settings',
  },
];
