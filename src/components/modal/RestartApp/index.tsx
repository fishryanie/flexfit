import React from 'react';
import CodePush from 'react-native-code-push';
import {Block, Button, Modal, ModalProps, Text} from 'components/base';
import {COLORS} from 'themes/color';

type RestartAppProps = ModalProps & {
  title: string;
  subtitle: string;
};
export const RestartApp: React.FC<RestartAppProps> = props => {
  const {title, subtitle} = props;
  return (
    <Modal {...props}>
      <Block
        gap={20}
        radius={20}
        paddingVertical={20}
        marginHorizontal={30}
        paddingHorizontal={15}
        backgroundColor={COLORS.white}>
        <Text fontWeight="bold" textAlign="center" fontSize={22}>
          {title}
        </Text>
        <Text textAlign="center" fontSize={16}>
          {subtitle}
        </Text>
        <Button
          title="OK"
          marginTop={35}
          width="50%"
          radius={15}
          alignSelf="center"
          onPress={() => CodePush.restartApp()}
        />
      </Block>
    </Modal>
  );
};
