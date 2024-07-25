import React, {useEffect, useState} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Block, Pressable, Text} from 'components/base';
import {StyleSheet} from 'react-native';
import {hs, rhs, width} from 'themes/helper';
import {COLORS} from 'themes/color';

const SWITCH_CONTAINER_WIDTH = width - 24;
const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 4;

export default function SegmentedControl() {
  const translateX = useSharedValue(0);
  const [value, setValue] = useState('system');

  const translateAnimation = useAnimatedStyle(() => ({
    width: SWITCH_WIDTH,
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateX: translateX.value}],
  }));

  useEffect(() => {
    if (value === 'system') {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (value === 'light') {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (value === 'dark') {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    } else if (value === 'dark') {
      translateX.value = withSpring(SWITCH_WIDTH * 3);
    }
  }, [value, translateX]);

  return (
    <Block
      rowCenter
      radius={10}
      height={40}
      marginBottom={20}
      width={rhs(SWITCH_CONTAINER_WIDTH)}
      backgroundColor={COLORS.antiFlashWhite}>
      <Animated.View style={translateAnimation}>
        <Block radius={10} height={35} width={rhs(SWITCH_WIDTH - 5)} backgroundColor={COLORS.white} />
      </Animated.View>
      <Pressable
        flex
        contentCenter
        onPress={() => {
          setValue('system');
        }}>
        <Text>{value}</Text>
      </Pressable>
      <Pressable
        flex
        contentCenter
        onPress={() => {
          setValue('light');
        }}>
        <Text>{value}</Text>
      </Pressable>
      <Pressable
        flex
        contentCenter
        onPress={() => {
          setValue('dark');
        }}>
        <Text>{value}</Text>
      </Pressable>
      <Pressable
        flex
        contentCenter
        onPress={() => {
          setValue('dark');
        }}>
        <Text>{value}</Text>
      </Pressable>
    </Block>
  );
}
