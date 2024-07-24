import React, {ReactElement, useEffect, useState} from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Block, BlockProps, Icon, Pressable, PressableProps} from 'components/base';
import {StyleSheet} from 'react-native';

type AccordionProps = Partial<{
  onPress: (status: boolean) => void;
  visibleOnLoad: boolean;
  CustomIcon: ReactElement;
  CustomBody: ReactElement | null;
  CustomTitle: ReactElement;
  titleContainer: PressableProps;
}>;

export const Accordion = ({
  onPress,
  CustomBody,
  CustomTitle,
  CustomIcon,
  visibleOnLoad,
  titleContainer,
  ...props
}: AccordionProps & BlockProps) => {
  const [heightDefault, setHeightDefault] = useState(0);
  const bodyRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * 90}deg`}],
  }));

  const handlePress = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        heightValue.value = withTiming(measure(bodyRef)!.height, {duration: 500});
      })();
    } else {
      heightValue.value = withTiming(0, {duration: 500});
    }
    open.value = !open.value;
    onPress && onPress(open.value);
  };

  useEffect(() => {
    if (visibleOnLoad) {
      heightValue.value = withTiming(heightDefault);
      open.value = true;
    }
  }, [visibleOnLoad, heightDefault]);

  return (
    <Block style={styles.container} {...props}>
      <Pressable rowCenter onPress={handlePress} {...titleContainer}>
        {CustomTitle}
        {CustomIcon ? (
          CustomIcon
        ) : (
          <Animated.View style={iconStyle}>
            <Icon type="MaterialIcons" name={'keyboard-arrow-right'} />
          </Animated.View>
        )}
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          style={styles.contentContainer}
          ref={bodyRef}
          onLayout={e => {
            const currentHeight = e.nativeEvent.layout.height;
            setHeightDefault(currentHeight);
          }}>
          {CustomBody}
        </Animated.View>
      </Animated.View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
});
