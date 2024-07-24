import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  interpolateColor,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import React, {ReactElement, useEffect} from 'react';
import {Icon, Pressable, PressableProps} from 'components/base';
import {COLORS} from 'themes/color';

type CheckBoxProps = PressableProps &
  Partial<{
    title: string;
    size: number;
    checked: boolean;
    disabled: boolean;
    LeftComponent: ReactElement;
    RightComponent: ReactElement;
    onChange: (value: boolean) => void;
  }>;

export const CheckBox = ({
  size = 22,
  checked,
  disabled = false,
  LeftComponent,
  RightComponent,
  onChange,
  ...props
}: CheckBoxProps) => {
  const animatedValue = useSharedValue(0);
  const _onChange = () => {
    animatedValue.value = withTiming(animatedValue.value === 0 ? 1 : 0, {
      duration: 300,
      easing: Easing.linear,
    });
    if (onChange) {
      runOnJS(onChange)(!animatedValue.value);
    }
  };

  const wrapperStyle = useAnimatedStyle(() => ({
    width: interpolate(animatedValue.value, [0, 1], [0, size]),
    height: interpolate(animatedValue.value, [0, 1], [0, size]),
    backgroundColor: COLORS.primary,
    position: 'absolute',
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(animatedValue.value, [0, 1], [COLORS.border, COLORS.primary]),
    transform: [{scale: interpolate(animatedValue.value, [0, 1], [1, 1])}],
    width: size,
    height: size,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }));

  useEffect(() => {
    if (checked !== undefined) {
      animatedValue.value = withTiming(checked === true ? 1 : 0, {
        duration: 300,
        easing: Easing.linear,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <Pressable rowCenter disabled={disabled} onPress={_onChange} {...props}>
      {LeftComponent}
      <Animated.View style={buttonStyle}>
        <Icon type="FontAwesome5" name="check" zIndex={20} size={12} color={COLORS.white} />
        <Animated.View style={wrapperStyle} />
      </Animated.View>
      {RightComponent}
    </Pressable>
  );
};
