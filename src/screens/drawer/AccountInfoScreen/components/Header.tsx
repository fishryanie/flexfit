import React, {ReactElement} from 'react';
import {navigationRef} from 'routers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block, BlockProps, Icon, Pressable, Text} from 'components/base';
import {width} from 'themes/helper';
import {COLORS} from 'themes/color';

type HeaderProps = {title: string} & Partial<{
  backText: string;
  backgroundColor: string;
  RightComponent: ReactElement;
}>;

export const Header: React.FC<HeaderProps & BlockProps> = headerProps => {
  const {title, backText, backgroundColor = COLORS.white, RightComponent, ...props} = headerProps;
  const {top} = useSafeAreaInsets();

  return (
    <Block
      rowCenter
      height={52 + top}
      paddingTop={top}
      paddingHorizontal={8}
      backgroundColor={backgroundColor}
      {...props}>
      <Block flexGrow={1} flexBasis={0} justifyContent="flex-start">
        <Pressable rowCenter gap={8} padding={8} onPress={navigationRef.goBack}>
          <Icon type="MaterialIcons" name="arrow-back" size={25} />
          {!!backText && <Text fontSize={15}>{backText}</Text>}
        </Pressable>
      </Block>
      <Block marginHorizontal={16} maxWidth={width - 16 - 32 - 41 - 74}>
        <Animated.View style={[nameAnimatedStyles]}>
          <Text style={styles.headerTitle}>{constants.name}</Text>
        </Animated.View>
      </Block>
      <Block row flexGrow={1} flexBasis={0} justifyContent="flex-end">
        {RightComponent}
      </Block>
    </Block>
  );
};
