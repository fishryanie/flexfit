import React from 'react';
import {Block, Button, Modal, Text} from 'components/base';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {navigationRoot} from 'navigation/navigationRef';
import {clearUser} from 'redux/user/slice';
import {COLORS} from 'themes/color';
import CodePush from 'react-native-code-push';

export const LoginExpiredModal = () => {
  const isExpiredToken = useAppSelector(state => state.auth.isExpiredToken);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(clearUser());
    setTimeout(() => {
      CodePush.restartApp();
      navigationRoot.navigate('LoginScreen');
    }, 500);
  };
  return (
    <Modal isVisible={isExpiredToken} position="center">
      <Block radius={18} margin={12} paddingHorizontal={12} paddingVertical={20} backgroundColor={COLORS.white}>
        <Text fontWeight="semibold" textAlign="center" fontSize={18} marginBottom={10} color={COLORS.primary}>
          Phiên đăng nhập đã hết hạn
        </Text>
        <Text fontSize={16} textAlign="center" marginBottom={15} color={COLORS.gray}>
          Vui lòng đăng nhập lại!
        </Text>
        <Button title="Xác nhận" marginTop={30} onPress={handleSubmit} />
      </Block>
    </Modal>
  );
};
