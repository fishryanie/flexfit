import React, {useState} from 'react';
import {Block, BlockProps, Icon, Image, Text} from 'components/base';
import {ResizeMode} from 'react-native-fast-image';
import {COLORS} from 'themes/color';

export type AvatarProps = Partial<{
  name: string;
  uri: string;
  size: number;
  fontDecrease: number;
  resizeMode: ResizeMode;
  onPress?: () => void;
}>;

export const Avatar = ({
  name = '',
  uri,
  size = 50,
  fontDecrease = 3.5,
  resizeMode = 'cover',
  backgroundColor = COLORS.primary,
  ...props
}: AvatarProps & BlockProps) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const bgColor = uri && !loadFailed ? 'transparent' : name ? backgroundColor : COLORS.primary;

  const _renderInner = () => {
    if (!uri && !name) {
      //   return <Image round={size} source={IMAGES.img_noUserProfile} resizeMode={resizeMode} />;
    } else if (uri && !loadFailed) {
      return <Image round={size} onError={() => setLoadFailed(true)} source={{uri}} resizeMode={resizeMode} />;
    } else if (name) {
      if (/^\d+$/.test(name)) {
        return <Icon solid type={'FontAwesome5'} name="user" color="primary" size={size / fontDecrease} />;
      } else {
        return (
          <Text paddingHorizontal={5} numberOfLines={1} color={COLORS.white} fontSize={size / fontDecrease}>
            {getInitials(name.replace(/[^\w\s]/gi, ''))}
          </Text>
        );
      }
    }
  };

  return (
    <Block round={size} contentCenter backgroundColor={bgColor} {...props}>
      {_renderInner()}
    </Block>
  );
};

function getInitials(name: string) {
  const words = name.split(' ');
  let result = '';
  for (const word of words) {
    result += word.charAt(0).toUpperCase();
  }
  if (!result) {
    console.warn('Could not get abbr from name');
    result = name;
  }
  return result;
}
