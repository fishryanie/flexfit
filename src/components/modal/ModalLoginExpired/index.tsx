import React from 'react';
import {Block, Button, Modal, Text} from 'components/base';
import {useAppSelector} from 'hooks/redux';
import {COLORS} from 'themes/color';
import {useLogout} from 'stores/auth/apiHooks';

export const ModalLoginExpired = () => {
  const {isLoading, request} = useLogout();
  const isExpiredToken = useAppSelector(state => state.auth.isExpiredToken);
  const handleSubmit = () => {
    request();
    // setTimeout(() => {
    //   CodePush.restartApp();
    //   navigationRoot.navigate('LoginScreen');
    // }, 500);
  };
  return (
    <Modal isVisible={isExpiredToken} position="center">
      <Block
        gap={20}
        radius={20}
        paddingVertical={20}
        marginHorizontal={30}
        paddingHorizontal={15}
        backgroundColor={COLORS.white}>
        <Text fontWeight="bold" textAlign="center" fontSize={22}>
          Phiên đăng nhập đã hết hạn
        </Text>
        <Text fontSize={16} textAlign="center">
          Vui lòng đăng nhập lại!
        </Text>
        <Button
          loading={isLoading}
          title="Xác nhận"
          marginTop={35}
          width="50%"
          radius={15}
          alignSelf="center"
          onPress={handleSubmit}
        />
      </Block>
    </Modal>
  );
};
