import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
import Animated, {Easing, useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const WHEEL_SIZE = width * 0.9;
const NUMBER_OF_SEGMENTS = 8;
const ANGLE = 360 / NUMBER_OF_SEGMENTS;

const rewards = ['Reward 1', 'Reward 2', 'Reward 3', 'Reward 4', 'Reward 5', 'Reward 6', 'Reward 7', 'Reward 8'];

const GogoSpin: React.FC = () => {
  const rotate = useSharedValue(0);

  const spinWheel = () => {
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    rotate.value = withTiming(randomRotation, {
      duration: 5000,
      easing: Easing.out(Easing.quad),
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotate.value}deg`}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheelContainer, animatedStyle]}>
        <Svg width={WHEEL_SIZE} height={WHEEL_SIZE} viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
          <G rotation={ANGLE / 2} origin={`${WHEEL_SIZE / 2}, ${WHEEL_SIZE / 2}`}>
            {rewards.map((reward, index) => (
              <Path
                key={index}
                d={describeArc(WHEEL_SIZE / 2, WHEEL_SIZE / 2, WHEEL_SIZE / 2, ANGLE * index, ANGLE * (index + 1))}
                fill={`hsl(${(index / NUMBER_OF_SEGMENTS) * 360}, 100%, 50%)`}
              />
            ))}
          </G>
        </Svg>
      </Animated.View>
      <Button title="Spin the Wheel!" onPress={spinWheel} />
    </View>
  );
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'L', x, y, 'Z'].join(' ');
  return d;
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): {x: number; y: number} => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WHEEL_SIZE / 2,
    overflow: 'hidden',
  },
});

export default GogoSpin;
