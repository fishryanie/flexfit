import React, {useLayoutEffect, useState} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Block, BlockProps} from 'components/base';
import {COLORS} from 'themes/color';
import {isArray} from 'lodash';

export type ProgressBarProps = Partial<{
  height: number;
  total: number;
  value: number;
  radius: number;
  duration: number;
  progressRadius: number;
  progressColor: string | Array<string>;
  backgroundColor: string;
  children: Element;
}>;

export const ProgressBar: React.FC<ProgressBarProps & BlockProps> = ({
  total = 1,
  value = 0.1,
  height = 10,
  radius = 10,
  duration = 300,
  progressRadius = 10,
  progressColor = COLORS.primary,
  backgroundColor = COLORS.white,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useSharedValue(-1000);

  useLayoutEffect(() => {
    animatedValue.value = withTiming(-width + (width * value) / total, {duration});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    top: 0,
    left: 0,
    height: height,
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    borderRadius: progressRadius,
    transform: [{translateX: animatedValue.value}],
  }));

  return (
    <Block
      height={height}
      radius={radius}
      backgroundColor={backgroundColor}
      style={{overflow: 'hidden'}}
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      {...props}>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          end={{x: 1, y: 0}}
          start={{x: 0, y: 0}}
          style={{width: '100%', height: '100%'}}
          colors={isArray(progressColor) ? progressColor : [progressColor, progressColor]}
        />
      </Animated.View>
    </Block>
  );
};
