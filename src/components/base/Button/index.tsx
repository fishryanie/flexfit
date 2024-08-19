import React, {ReactElement} from 'react';
import {ActivityIndicator} from 'react-native';
import {Pressable, PressableProps, TextProps, Text, Block} from 'components/base';
import {COLORS} from 'themes/color';

type ButtonProps = Partial<
  {
    onPress: () => void;
    outline: boolean;
    disabled: boolean;
    loading: boolean;
    maxWidth: number;
    title: string;
    color: string;
    fontSize: TextProps['fontSize'];
    fontWeight: TextProps['fontWeight'];
    iconLeft: ReactElement;
    iconRight: ReactElement;
  } & PressableProps
>;

export const Button = ({
  onPress,
  title = '',
  disabled,
  fontWeight,
  iconLeft,
  iconRight,
  radius = 10,
  height = 45,
  fontSize = 16,
  loading = false,
  outline = false,
  backgroundColor = outline ? 'transparent' : COLORS.primary,
  color = outline ? COLORS.primary : COLORS.white,
  ...containerProps
}: ButtonProps) => {
  return (
    <Pressable
      height={height}
      radius={radius}
      onPress={onPress}
      contentCenter
      borderWidth={1}
      borderColor={outline ? color : disabled ? COLORS.border : backgroundColor}
      backgroundColor={disabled ? COLORS.border : backgroundColor}
      disabled={loading || disabled}
      {...containerProps}>
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Block rowCenter>
          {iconLeft}
          <Text color={color} fontSize={fontSize} fontWeight={fontWeight}>
            {title}
          </Text>
          {iconRight}
        </Block>
      )}
    </Pressable>
  );
};
