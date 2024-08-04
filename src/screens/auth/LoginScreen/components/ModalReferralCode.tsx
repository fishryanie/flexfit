/** @format */

import React from 'react';
import {Block, Icon, Modal, ModalProps, Pressable, Text} from 'components/base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'themes/color';
import {navigationRef} from 'routers';

export default function ModalReferralCode(props: ModalProps) {
  const {bottom} = useSafeAreaInsets();
  return (
    <Modal {...props}>
      <Block
        radius={20}
        padding={15}
        paddingTop={50}
        marginBottom={bottom}
        marginHorizontal={15}
        style={{overflow: 'hidden'}}
        backgroundColor={COLORS.primary}>
        <Icon
          top={15}
          size={22}
          right={15}
          type="AntDesign"
          name="closecircle"
          position="absolute"
          color={COLORS.blackTransparent20}
        />
        <Pressable rowCenter radius={15} padding={15} backgroundColor={COLORS.light}>
          <Icon name="plus" size={20} color={COLORS.primary} type="Octicons" marginRight={10} />
          <Text fontWeight="medium" textAlign="center" fontSize={18}>
            Add Referral Code
          </Text>
        </Pressable>
        <Text
          fontWeight="medium"
          lineHeight={25}
          marginVertical={25}
          marginHorizontal={15}
          color={COLORS.textPlaceholder}>
          By signing in, you agree to Flexfit <Text fontWeight="bold">Privacy Policy</Text> and{' '}
          <Text fontWeight="bold">Terms of Use</Text>
        </Text>
        <Pressable
          radius={15}
          padding={15}
          onPress={() => {
            props.onClose?.();
            // navigationRef.navigate(router.REGISTER_SCREEN);
          }}>
          <Text fontWeight="bold" textAlign="center" fontSize={18}>
            Continue
          </Text>
        </Pressable>
      </Block>
    </Modal>
  );
}
