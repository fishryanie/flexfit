import React from 'react';
import {Block, Image, Text} from 'components/base';
import {Source} from 'react-native-fast-image';
import {IMAGES} from 'assets';

type EmptyDataProps = {
  width?: number;
  height?: number;
  title?: string;
  source?: Source;
};

export const EmptyData: React.FC<EmptyDataProps> = ({
  width = 200,
  height = 200,
  title = 'Không có dữ liệu!',
  source = IMAGES.img_empty,
}) => {
  return (
    <Block contentCenter radius={10}>
      <Image source={source} width={width} height={height} />
      <Text marginBottom={60} fontSize={16}>
        {title}
      </Text>
    </Block>
  );
};
